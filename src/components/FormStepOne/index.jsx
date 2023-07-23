import { useNavigate } from 'react-router-dom';
import './style.css';
import { toast } from 'react-toastify';

function FormStepOne({ setCurrentStep, signUpForm, setSignUpForm }) {
  let { ...form } = signUpForm;

  const navigate = useNavigate();

  function nextForm() {
    if (!signUpForm.name) {
      return toast.info("O campo nome é obrigatório")
    }
    if (!signUpForm.email) {
      return toast.info("O campo e-mail é obrigatório")
    }
    setCurrentStep(1);
  }

  function handleChangeForm(e) {
    setSignUpForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form className='form-signup'>
      <h1>Adicione seus dados</h1>
      <label htmlFor="name">Nome*</label>
      <input type="text" name="name" value={signUpForm.name} id="name" placeholder='Digite seu nome' autoComplete='on' onChange={(e) => handleChangeForm(e)} />
      <label htmlFor="email">E-mail*</label>
      <input type="email" name="email" value={signUpForm.email} id="email"
        placeholder='Digite seu e-mail' autoComplete='on' onChange={(e) => handleChangeForm(e)} />
      <button type='button' onClick={nextForm}>Continuar</button>
      <p>
        Já possui uma conta? Faça seu <span onClick={() => navigate("/")}>Login</span>
      </p>

    </form>
  )
}

export default FormStepOne;
