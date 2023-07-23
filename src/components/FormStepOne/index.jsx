import { useNavigate } from 'react-router-dom';
import './style.css';

function FormStepOne({ setCurrentStep }) {
  const navigate = useNavigate();

  function nextForm() {
    setCurrentStep(1);
  }

  return (
    <form className='form-signup'>
      <h1>Adicione seus dados</h1>
      <label htmlFor="name">Nome*</label>
      <input type="text" name="name" id="name" placeholder='Digite seu nome' autoComplete='on' />
      <label htmlFor="email">E-mail*</label>
      <input type="email" name="email" id="email"
        placeholder='Digite seu e-mail' autoComplete='on' />
      <button onClick={nextForm}>Continuar</button>
      <p>
        Já possui uma conta? Faça seu <span onClick={() => navigate("/")}>Login</span>
      </p>

    </form>
  )
}

export default FormStepOne;
