import { useState } from 'react';
import './style.css';
import FormStepOne from '../../components/FormStepOne';
import FormStepTwo from '../../components/FormStepTwo';
import SuccessMessage from '../../components/SuccessMessage';
import StepperCustom from '../../components/StepperCustom';

function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main className='container-signup'>
      <div className="container-steps">
        <StepperCustom currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      <div className='container-register'>
        <div className="container-forms">
          {
            currentStep === 0
            &&
            <FormStepOne setCurrentStep={setCurrentStep} />
          }
          {
            currentStep === 1
            &&
            <FormStepTwo setCurrentStep={setCurrentStep} />
          }
          {
            currentStep === 2
            &&
            <SuccessMessage setCurrentStep={setCurrentStep} />
          }
        </div>
      </div>
    </main>
  )
}

export default SignUp;
