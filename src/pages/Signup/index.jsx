import { useState } from 'react';
import './style.css';
import FormStepOne from '../../components/FormStepOne';
import FormStepTwo from '../../components/FormStepTwo';
import SuccessMessage from '../../components/SuccessMessage';

function SignUp() {
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <main className='container-signup'>
      <div className="container-steps">

      </div>
      <div className='container-register'>
        <div className="container-forms">
          {
            currentForm === 1
            &&
            <FormStepOne setCurrentForm={setCurrentForm} />
          }
          {
            currentForm === 2
            &&
            <FormStepTwo setCurrentForm={setCurrentForm} />
          }
          {
            currentForm === 3
            &&
            <SuccessMessage setCurrentForm={setCurrentForm} />
          }
        </div>
      </div>
    </main>
  )
}

export default SignUp;
