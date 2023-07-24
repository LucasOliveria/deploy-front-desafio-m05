import currentStepIcon from "../../assets/current-step-icon.svg";
import nextStepIcon from "../../assets/next-step-icon.svg";
import checkStepIcon from "../../assets/check-step-icon.svg";
import './style.css';

function StepperCustom({ currentStep, setCurrentStep }) {
  const handleBack = () => {
    if (currentStep === 2) {
      return;
    }

    return setCurrentStep(0);
  };

  return (
    <div className="content-steps">
      <div className='step-box' onClick={handleBack}>
        <img src={currentStep === 0 ? currentStepIcon : checkStepIcon} alt="step" />
        <h3>Cadastre-se</h3>
      </div>

      <div className="instructions">
        <div className="step-line"></div>
        <p>Por favor, escreva seu nome e e-mail</p>
      </div>

      <div className='step-box'>
        <img src={currentStep === 1 ? currentStepIcon : currentStep === 0 ? nextStepIcon : checkStepIcon} alt="step" />
        <h3>Escolha uma senha</h3>
      </div>

      <div className="instructions">
        <div className="step-line"></div>
        {currentStep === 1 || currentStep === 2 ? <p>Escolha uma senha segura</p> : ""}

      </div>

      <div className='step-box'>
        <img src={currentStep === 2 ? checkStepIcon : nextStepIcon} alt="step" />
        <h3>Cadastro realizado com sucesso</h3>
      </div>

      <div className="instructions">
        <div className="aux-line"></div>
        {currentStep === 2 && <p>E-mail e senha cadastrados com sucesso</p>}
      </div>
    </div>
  );
}

export default StepperCustom;