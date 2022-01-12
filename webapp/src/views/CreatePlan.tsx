/* eslint-disable no-nested-ternary */
import { FC, useEffect, useState } from 'react';
import { Contract, Signer, providers, utils, BigNumber } from 'ethers';
import {
  Button,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Spinner,
  Progress,
  InputGroup,
  InputGroupText,
  FormText,
} from 'reactstrap';
import { useWeb3React } from '@web3-react/core';
import { Check, Send } from 'react-feather';

import Breadcrumbs from '../components/dapp/Breadcrumbs';
import CircleIcon from '../components/CircleIcon';
import { isKeyof } from '../utils/indexGuard';
import { getContractAddress, loadContract } from '../utils/contracts';

function isValidCID(cid: string): boolean {
  // TODO: Check for validity
  return !!cid.length;
}

const predefinedModels = { 'Linear Regression': 'CID' };

interface ProjectDisplayProps {
  contract: Contract;
}

const CreatePlan: FC<ProjectDisplayProps> = ({ contract }) => {
  const breadcrumbLinks = [
    {
      link: '..',
      name: 'Project',
    },
    {
      link: '',
      name: 'Create Training Plan',
    },
  ];

  const { chainId, library, account } = useWeb3React();
  const isActive = account && chainId;

  const [modelCID, setModelCID] = useState('');
  const [modelName, setModelName] = useState('');
  const [isCustome, setIsCustome] = useState(false);
  const [numRounds, setNumRounds] = useState(0);
  const [reward, setReward] = useState(0);

  const [upAllowance, setUpAllowance] = useState(0);

  const [isSubmitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const [allowance, setAllowance] = useState<undefined | BigNumber>(undefined);
  const [tokenContract, setTokenContract] = useState<undefined | Contract>(undefined);

  useEffect(() => {
    let didCancel = false;

    async function getTokenContract() {
      if (library && chainId) {
        const token = await loadContract(
          chainId,
          'FELToken',
          library.getSigner(),
        );

        if (token && account && contract) {
          const a = await token.allowance(account, contract.address);
          if (!didCancel) {
            setTokenContract(token);
            setAllowance(a);
          }
        }
      }
    }

    getTokenContract();
    return () => {
      didCancel = true;
    };
  }, [library, chainId, account, contract]);

  const deploy = async () => {
    setSubmitted(true);
    setError('');
    setProgress(0);

    const cid = (isCustome) ? modelCID : (isKeyof(modelName, predefinedModels)) ? predefinedModels[modelName] : '';
    if (isValidCID(cid)) {
      setShowModal(true);
      try {
        setProgress(2);
        const tx = await contract.createPlan(cid, numRounds, reward);
        setProgress(3);
        await tx.wait();
      } catch (e: any) {
        setError(e && e.message ? e.message : 'Unknown error');
        return;
      }
      setProgress(5);
    }
  };

  const increaseAllowance = async () => {
    setSubmitted(true);
    setError('');
    setProgress(0);

    if (contract && tokenContract && chainId && library) {
      setShowModal(true);
      try {
        setProgress(2);
        const tx = await tokenContract.approve(
          contract.address,
          utils.parseUnits(upAllowance.toString(), 'gwei'),
        );
        setProgress(3);
        await tx.wait();
      } catch (e: any) {
        setError(e && e.message ? e.message : 'Unknown error');
        setProgress((progress > 3) ? 4 : 2);
        return;
      }
      setProgress(5);
    }
  };

  return (
    <main>
      <Breadcrumbs title="Create Training Plan" links={breadcrumbLinks} />
      <Row className="px-4 px-sm-5 pb-5 justify-content-center">
        <Card body className="shadow border-0" style={{ maxWidth: '800px' }}>
          <Form>
            <FormGroup>
              <Label for="modelCID">Select model</Label>
              <InputGroup>
                <InputGroupText
                  className="cursor-pointer"
                  onClick={() => setIsCustome(false)}
                >
                  <Input
                    type="radio"
                    checked={!isCustome}
                    readOnly
                  />
                  <span className="ms-2">Predefined model:</span>
                </InputGroupText>
                <Input
                  id="modelCID"
                  name="modelCID"
                  type="select"
                  value={modelName}
                  disabled={isCustome}
                  onChange={(e) => setModelName(e.target.value)}
                >
                  <option value="">Select predefined model...</option>
                  {Object.keys(predefinedModels).map((name) => <option key={name} value={name}>{name}</option>)}
                </Input>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupText
                  className="cursor-pointer"
                  onClick={() => setIsCustome(true)}
                >
                  <Input
                    type="radio"
                    checked={isCustome}
                    readOnly
                  />
                  <span className="ms-2">Custome model CID:</span>
                </InputGroupText>
                <Input
                  className="ps-2"
                  id="modelCIDc"
                  name="modelCIDc"
                  type="text"
                  value={modelCID}
                  disabled={!isCustome}
                  onChange={(e) => setModelCID(e.target.value)}
                />
              </InputGroup>
              <FormText>
                For more instructions how to get model CID read documentation (TODO: add link, or CID generation tool).
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="rounds">Number of rounds: <span className="fw-bold">{numRounds}</span></Label>
              <Input
                id="rounds"
                name="rounds"
                type="range"
                min="0"
                max="100"
                value={numRounds}
                onChange={(e) => setNumRounds(parseInt(e.target.value, 10))}
              />
            </FormGroup>
            <FormGroup>
              <Label for="reward">Node reward per round (in gwei)</Label>
              <Input
                id="reward"
                name="reward"
                type="number"
                value={reward}
                required
                invalid={isSubmitted && !reward}
                onChange={(e) => setReward(Math.max(0, parseInt(e.target.value, 10)))}
              />
              <FormText>
                Your allowance is: {!!allowance && utils.formatUnits(allowance, 'gwei')} gwei. Please increase allowance by clicking here.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="reward">Increase Allowance (in gwei)</Label>
              <InputGroup>
                <Input
                  id="reward"
                  name="reward"
                  type="number"
                  value={upAllowance}
                  required
                  invalid={isSubmitted && !reward}
                  onChange={(e) => setUpAllowance(Math.max(0, parseInt(e.target.value, 10)))}
                />
                <Button disabled={!isActive} color="primary" onClick={increaseAllowance}>
                  Increase Allowance {showModal && <Spinner size="sm" />}
                </Button>
              </InputGroup>
            </FormGroup>

            <Button disabled={!isActive} color="primary" onClick={deploy}>
              Deploy {showModal && <Spinner size="sm" />}
            </Button>
          </Form>
        </Card>
      </Row>

      <Modal centered isOpen={showModal}>
        <ModalHeader>
          Deployment {progress < 7 ? 'in Progress' : 'Finished'}
        </ModalHeader>
        <ModalBody>Don&apos;t close this browser tab while running!</ModalBody>
        <div className="d-flex align-items-center m-4 position-relative">
          <Progress
            className="w-100 m-0"
            animated={!error && progress < 5}
            color={error ? 'danger' : 'success'}
            value={progress}
            max={4}
          />
          <CircleIcon
            icon={<Send />}
            color={
              error && progress === 2
                ? 'danger'
                : progress < 3
                  ? 'secondary'
                  : 'success'
            }
            light={progress < 3 && !(error && progress === 2)}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
            }}
          />
          <CircleIcon
            icon={<Check />}
            color={
              error && progress === 4
                ? 'danger'
                : progress < 5
                  ? 'secondary'
                  : 'success'
            }
            light={progress < 5 && !(error && progress === 5)}
            style={{ position: 'absolute', right: 0 }}
          />
        </div>
        <div>
          <ModalBody className="text-danger">
            {error && (
              <>
                <span className="fw-bold">Error: </span>
                {error}
              </>
            )}
          </ModalBody>
        </div>
        <ModalFooter>
          <Button
            disabled={progress < 5}
            color="primary"
            onClick={() => setShowModal(false)}
          >
            Finish
          </Button>{' '}
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default CreatePlan;
