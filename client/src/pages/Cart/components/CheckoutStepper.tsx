import { Step, StepLabel, Stepper } from '@mui/material';
import { FC } from 'react';

const steps = ['Giỏ hàng', 'Địa chỉ', 'Thanh toán'];

interface CheckoutStepperProps {
  step: number;
}

const CheckoutStepper: FC<CheckoutStepperProps> = ({ step }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 lg:mb-8">
      <div className="col-span-2">
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default CheckoutStepper;
