/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { Contract } from 'ethers';
import { arrayify } from 'ethers/lib/utils';
import { FC, useCallback, useEffect, useState } from 'react';
import { Check, X, Send } from 'react-feather';
import { Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row, Table } from 'reactstrap';
import { hooks, metaMask } from '../../connectors/metaMask';
import { encryptSecret, getNodeCurrentSecret } from '../../utils/cryptography';
import CircleIcon from '../CircleIcon';

interface DataProviderRequestsProps {
  contract: Contract;
}

interface DataProviderJoinRequest {
  _address: string;
  publicKey: string;
}

const DataProviderRequests: FC<DataProviderRequestsProps> = ({ contract }) => {
  const [requests, setRequests] = useState<DataProviderJoinRequest[]>([]);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { useAccount } = hooks;
  const account = useAccount();
  const { provider } = metaMask;

  const fetchRequests = useCallback(async () => {
    if (!contract) return;

    const numberOfRequests = (await contract.getNodeRequestsLength())?.toNumber();

    setRequests(await Promise.all(Array(numberOfRequests).fill(0).map((_, i) => contract.nodeRequests(i))));
  }, [contract]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const decideRequest = async (publicKey: string, approve: boolean) => {
    if (!contract || !account || !provider) return;

    setShowModal(true);
    setProgress(2);
    setError('');

    try {
      let tx;
      if (approve) {
        const secret = await getNodeCurrentSecret(provider, contract, account);
        const ciphertext = encryptSecret(Buffer.from(arrayify(publicKey)), secret);
        tx = await contract.acceptNode(ciphertext);
      } else {
        tx = await contract.declineNode();
      }

      setProgress(3);

      await tx.wait();
      setProgress(5);
    } catch (e: any) {
      setError(e && e.message ? e.message : 'Unknown error');
      setProgress((progress > 2) ? 4 : 2);
    }

    await fetchRequests();
  };

  return (
    <>
      <Row className="gt-2 mt-3">
        <Col>
          <Card className="shadow">
            <CardBody>
              <CardTitle tag="h3">
                Data Provider Access Requests
              </CardTitle>
              {!requests.length && (
                <h5 className="text-muted">
                  There are no builder requests.
                </h5>
              )}
            </CardBody>
            {!!requests.length && (
              <Table hover responsive>
                <thead>
                  <tr>
                    <th className="ps-5">#</th>
                    <th className="text-center">Address</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, idx) => (
                    <tr key={request._address}>
                      <th className="ps-5 align-middle">{idx}</th>
                      <td className="text-center align-middle">{request._address}</td>
                      <td className="text-center align-items-center">
                        {idx === 0 && (
                          <>
                            <CircleIcon icon={<Check />} onClick={() => decideRequest(request.publicKey, true)} />
                            <CircleIcon color="danger" icon={<X />} onClick={() => decideRequest(request.publicKey, false)} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Row>

      <Modal centered isOpen={showModal}>
        <ModalHeader>
          Transaction {progress < 5 ? 'in Progress' : 'Finished'}
        </ModalHeader>
        <ModalBody>
          Don&apos;t close this browser tab while running!
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
    </>
  );
};

export default DataProviderRequests;
