import { useNavigate } from 'react-router-dom';
import eyeOff from '../../assets/eye-off.svg'
import StepsBottom from "../StepsBottom"
import './style.css';
import { useState } from 'react';

function FormStepTwo({ setCurrentStep }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function nextForm() {
    setCurrentStep(2)
  }

  return (
    <form className='form-signup'>
      <h1>Escolha uma senha</h1>
      <label htmlFor="password">Senha*</label>
      <div className="content-password">
        <img src={eyeOff} alt="eye off" onClick={() => setShowPassword(!showPassword)} />
        <input type={showPassword ? "text" : "password"} name="password" id="password" autoComplete='on' />
      </div>
      <label htmlFor="confirmPassword">Repita a senha*</label>
      <div className="content-password">
        <img src={eyeOff} alt="eye off" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" autoComplete='on' />
      </div>
      <button onClick={nextForm}>Finalizar cadastro</button>
      <p>
        Já possui uma conta? Faça seu <span onClick={() => navigate("/")}>Login</span>
      </p>
      <StepsBottom stepLine={1} />
    </form>
  )
}

export default FormStepTwo;
