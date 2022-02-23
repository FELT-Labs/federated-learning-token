/* eslint-disable no-nested-ternary */
import { FC, useEffect, useState } from 'react';
import { Contract, utils, BigNumber } from 'ethers';
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
  Col,
  Table,
} from 'reactstrap';
import { Check, Send } from 'react-feather';
import isIPFS from 'is-ipfs';

import Breadcrumbs from '../components/dapp/Breadcrumbs';
import CircleIcon from '../components/CircleIcon';
import { loadContract } from '../utils/contracts';
import { hooks } from '../connectors/metaMask';
import { predefinedModels } from '../utils/models';

function isValidCID(cid: string): boolean {
  // TODO: Test if exists?
  // Check for validity
  return isIPFS.cid(cid);
}

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

  const { useChainId, useProvider, useIsActive, useAccount } = hooks;

  const chainId = useChainId();
  const provider = useProvider();
  const isActive = useIsActive();
  const account = useAccount();

  const [modelCID, setModelCID] = useState('');
  const [modelName, setModelName] = useState('');
  const [isCustome, setIsCustome] = useState(false);
  const [numRounds, setNumRounds] = useState(1);
  const [numActiveNodes, setNumActiveNodes] = useState(0);
  const [reward, setReward] = useState(0);

  const [newAllowance, setNewAllowance] = useState(0);

  const [isPlanSubmitted, setPlanSubmitted] = useState(false);
  const [isAllowSubmitted, setAllowSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const [allowance, setAllowance] = useState<undefined | BigNumber>(undefined);
  const [tokenContract, setTokenContract] = useState<undefined | Contract>(undefined);

  useEffect(() => {
    let didCancel = false;

    async function getTokenContract() {
      if (provider && chainId) {
        const token = await loadContract(
          chainId,
          'FELToken',
          provider.getSigner(),
        );

        if (token && account && contract) {
          const [allow, activeNodes] = await Promise.all([
            token.allowance(account, contract.address),
            contract.activeNodes(),
          ]);
          if (!didCancel) {
            setTokenContract(token);
            setAllowance(allow);
            setNumActiveNodes(activeNodes);
          }
        }
      }
    }

    getTokenContract();
    return () => {
      didCancel = true;
    };
  }, [chainId, account, contract, provider]);

  // Values displayed in the table
  const totalReward = reward * numRounds * numActiveNodes;
  const totalRewardBN = utils.parseUnits(totalReward.toString(), 'gwei');
  const remAllowance = (allowance) ? utils.formatUnits(allowance.sub(totalRewardBN), 'gwei') : 'NaN';
  const positive = (allowance) ? allowance.gte(totalRewardBN) : undefined;

  const clearModal = () => {
    setAllowSubmitted(false);
    setPlanSubmitted(false);
    setError('');
    setProgress(0);
  };

  const deploy = async () => {
    clearModal();
    setPlanSubmitted(true);

    const cid = (isCustome) ? modelCID : predefinedModels.get(modelName);
    if (positive && cid && isValidCID(cid)) {
      setShowModal(true);
      try {
        setProgress(2);
        const tx = await contract.createPlan(cid, numRounds, reward);
        setProgress(3);
        await tx.wait();
      } catch (e: any) {
        setError(e && e.message ? e.message : 'Unknown error');
        setProgress((progress > 2) ? 4 : 2);
        return;
      }
      setProgress(5);
    }
  };

  const updateAllowance = async () => {
    clearModal();
    setAllowSubmitted(true);

    if (newAllowance > 0 && contract && tokenContract && chainId && provider) {
      setShowModal(true);
      try {
        setProgress(2);
        // TODO: This might lead to some issues later
        // https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-approve-address-uint256-
        const tx = await tokenContract.approve(
          contract.address,
          utils.parseUnits(newAllowance.toString(), 'gwei'),
        );
        setProgress(3);
        await tx.wait();
        // Update allowance displayed (user can change the allowance value inside MetaMask)
        if (tokenContract) {
          const a = await tokenContract.allowance(account, contract.address);
          setAllowance(a);
        }
      } catch (e: any) {
        setError(e && e.message ? e.message : 'Unknown error');
        setProgress((progress > 2) ? 4 : 2);
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
          <Form className="create-plan-form">
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
                  invalid={isPlanSubmitted
                    && !isCustome
                    && !modelName.length
                    && !predefinedModels.has(modelName)}
                  onChange={(e) => setModelName(e.target.value)}
                >
                  <option value="">Select predefined model...</option>
                  {Array.from(predefinedModels.keys()).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
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
                  invalid={isPlanSubmitted && isCustome && !isValidCID(modelCID)}
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
                min="1"
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
                invalid={isPlanSubmitted && !positive}
                onChange={(e) => setReward(Math.max(0, parseInt(e.target.value, 10)))}
              />
              <FormText>
                Your allowance is: {!!allowance && utils.formatUnits(allowance, 'gwei')} gwei.
                You can increase allowance using field below.
              </FormText>
            </FormGroup>
            <FormGroup row className="justify-content-center">
              <Label
                md={4}
                className="fw-bold"
              >
                Reward calculation
              </Label>
              <Col md={6}>
                <Table borderless size="sm" className="mt-2">
                  <tbody>
                    <tr>
                      <td>
                        Active nodes
                      </td>
                      <td className="text-end">
                        {numActiveNodes}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Rounds
                      </td>
                      <td className="text-end">
                        {numRounds}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Reward per round
                      </td>
                      <td className="text-end">
                        {reward}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Total reward
                      </td>
                      <td className="text-end">
                        {numRounds * reward * numActiveNodes}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Remaining allowance
                      </td>
                      <td className={`text-end ${positive ? 'text-success' : 'text-danger'}`}>
                        {remAllowance}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={10}>
                <FormGroup>
                  <Label for="reward">Change Allowance (in gwei)</Label>
                  <InputGroup>
                    <Input
                      id="reward"
                      name="reward"
                      type="number"
                      value={newAllowance}
                      required
                      invalid={isAllowSubmitted && !newAllowance}
                      onChange={(e) => setNewAllowance(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    <Button
                      disabled={!isActive}
                      color="primary"
                      onClick={updateAllowance}
                    >
                      Update Allowance {isAllowSubmitted && showModal && <Spinner size="sm" />}
                    </Button>
                  </InputGroup>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup>
              <Button
                disabled={!isActive}
                color="primary"
                onClick={deploy}
              >
                Deploy {isPlanSubmitted && showModal && <Spinner size="sm" />}
              </Button>
              {isPlanSubmitted && progress === 0
              && (
              <small className="text-danger">
                Make sure all fields are filled correctly.
              </small>
              )}
            </FormGroup>
          </Form>
        </Card>
      </Row>

      <Modal centered isOpen={showModal}>
        <ModalHeader>
          Transaction {progress < 5 ? 'in Progress' : 'Finished'}
        </ModalHeader>
        <ModalBody>
          {(progress === 2 && !error) && 'Waiting for transaction confirmation. Please confirm transaction using your wallet (e.g. MetaMask).'}
          {(progress === 2 && !!error) && 'Something went wrong during transaction creation/approval.'}
          {progress === 3 && 'Transaction send! Waiting for transaction to be processed by blockchain.'}
          {progress === 4 && 'Something went wrong during transaction execution.'}
          {progress === 5 && 'Transaction sucessfully completed.'}
        </ModalBody>
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
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default CreatePlan;
