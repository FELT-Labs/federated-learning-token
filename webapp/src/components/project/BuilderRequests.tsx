/* eslint-disable no-nested-ternary */
import { Contract } from 'ethers';
import { FC, useCallback, useEffect, useState } from 'react';
import { Check, X, Send } from 'react-feather';
import { Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row, Table } from 'reactstrap';
import CircleIcon from '../CircleIcon';

interface BuilderRequestsProps {
  contract: Contract;
}

interface BuilderRequest {
  builderAddress: string,
}

const BuilderRequests: FC<BuilderRequestsProps> = ({ contract }) => {
  const [requests, setRequests] = useState<BuilderRequest[]>([]);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchRequests = useCallback(async () => {
    if (!contract) return;

    const numberOfRequests = (await contract.getBuilderRequestsLength())?.toNumber();

    const fetchRequest = async (i: number): Promise<BuilderRequest> => {
      const requestAddress = await contract.builderRequestsArray(i);
      return contract.builderRequests(requestAddress);
    };

    setRequests(await Promise.all(Array(numberOfRequests).fill(0).map((_, i) => fetchRequest(i))));
  }, [contract]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const decideRequest = async (address: string, approve: boolean) => {
    if (!contract) return;

    setShowModal(true);
    setProgress(2);
    setError('');

    try {
      let tx;
      if (approve) tx = await contract.acceptBuilderJoinRequest(address);
      else tx = await contract.declineBuilderJoinRequest(address);

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
                Builder Access Requests
              </CardTitle>
            </CardBody>
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
                  <tr key={request.builderAddress}>
                    <th className="ps-5 align-middle">{idx}</th>
                    <td className="text-center align-middle">{request.builderAddress}</td>
                    <td className="text-center align-items-center">
                      <CircleIcon icon={<Check />} onClick={() => decideRequest(request.builderAddress, true)} />
                      <CircleIcon color="danger" icon={<X />} onClick={() => decideRequest(request.builderAddress, false)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default BuilderRequests;
