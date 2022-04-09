/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/prop-types */
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { Check } from 'react-feather';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from 'reactstrap';
import CircleIcon from './CircleIcon';

interface TransactionStep {
  fn: any;
  text: string;
  icon: any;
}

interface TransactionModalProps {
  steps: TransactionStep[];
}

type TransactionModalType = ForwardRefExoticComponent<TransactionModalProps & RefAttributes<unknown>>;

const TransactionModal: TransactionModalType = forwardRef(({ steps }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');

  const getBarProgress = useCallback(() => currentStep * 2 + 2, [currentStep]);
  const finished = useCallback(() => currentStep >= steps.length, [currentStep, steps]);

  const getIconLight = (step: number) => currentStep < step;
  const getIconPosition = (step: number) => `${(100 / (steps.length + 1)) * (step + 1)}%`;
  const getIconColor = (step: number) => {
    if (error && currentStep === step) return 'danger';
    if (currentStep >= step) return 'success';

    return 'secondary';
  };

  useImperativeHandle(
    ref,
    () => ({
      run: async () => {
        setIsOpen(true);
        setError('');
        setCurrentStep(0);
        let step = 0;

        for (const { fn } of steps) {
          try {
            await fn();
            setCurrentStep((step += 1));
          } catch (e: any) {
            setError(e && (e.message || 'Unknown error'));
            return;
          }
        }
      },
    }),
    [steps],
  );

  return (
    <Modal centered isOpen={isOpen}>
      <ModalHeader>Transaction {finished() ? 'Finished' : 'in Progress'}</ModalHeader>
      <ModalBody>{finished() ? 'Transaction sucessfully completed' : steps[currentStep].text}</ModalBody>
      <div className="d-flex align-items-center m-4 position-relative">
        <Progress
          className="w-100 m-0"
          animated={!finished()}
          color={error ? 'danger' : 'success'}
          value={getBarProgress()}
          max={2 + steps.length * 2}
        />
        {steps.map(({ icon }, idx) => (
          <CircleIcon
            icon={icon}
            color={getIconColor(idx)}
            light={getIconLight(idx)}
            style={{ position: 'absolute', left: getIconPosition(idx) }}
          />
        ))}
        <CircleIcon
          icon={<Check />}
          color={getIconColor(steps.length)}
          light={getIconLight(steps.length)}
          style={{ position: 'absolute', right: 0 }}
        />
      </div>
      {error && (
        <ModalBody className="text-danger">
          <span className="fw-bold">Error: </span>
          {error}
        </ModalBody>
      )}
      <ModalFooter>
        <Button disabled={!finished()} color="primary" onClick={() => setIsOpen(false)}>
          Finish
        </Button>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </ModalFooter>
    </Modal>
  );
});

export default TransactionModal;
