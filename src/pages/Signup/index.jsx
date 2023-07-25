import { useEffect, useState } from 'react';
import FormStepOne from '../../components/FormStepOne';
import FormStepTwo from '../../components/FormStepTwo';
import StepperCustom from '../../components/StepperCustom';
import StepsBottom from '../../components/StepsBottom';
import SuccessMessage from '../../components/SuccessMessage';
import { getItem } from '../../utils/storage';
import './style.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  useEffect(() => {
    if (getItem("token")) {
      navigate('/dashboard/home');
    }
  }, []);

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
            <FormStepOne
              setCurrentStep={setCurrentStep}
              signUpForm={signUpForm}
              setSignUpForm={setSignUpForm}
            />
          }
          {
            currentStep === 1
            &&
            <FormStepTwo
              setCurrentStep={setCurrentStep}
              signUpForm={signUpForm}
              setSignUpForm={setSignUpForm}
            />
          }
          {
            currentStep === 2
            &&
            <SuccessMessage setCurrentStep={setCurrentStep} />
          }
        </div>

        <div className="container-steps-bottom">
          <StepsBottom currentStep={currentStep} />
        </div>
      </div>
    </main>
  )
}

export default SignUp;
