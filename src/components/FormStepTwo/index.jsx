import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import eyeOff from '../../assets/eye-off.svg';
import './style.css';
import { api } from "../../services/api"

function FormStepTwo({ setCurrentStep, signUpForm, setSignUpForm }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let { ...form } = signUpForm;

  function handleChangeForm(e) {
    setSignUpForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignUpUser(e) {
    e.preventDefault();

    if (!signUpForm.password) {
      return toast.info("O campo senha é obrigatório");
    }

    if (!signUpForm.confirmPassword) {
      return toast.info("Confirme a senha!");
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      return toast.info("As senhas não são iguais. Confirme a senha corretamente");
    }

    const id = toast.loading("Por favor, aguarde...")
    try {
      await api.post("/user", {
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password
      });

      toast.update(id, { render: "Cadastro realizado com sucesso!", type: "success", isLoading: false, autoClose: 1500 });

      setCurrentStep(2);
    } catch (error) {
      toast.update(id, { render: error.response.data, type: "error", isLoading: false, autoClose: 1500 });

      if (error.response.data === "O campo e-mail não está em um formato válido" || error.response.data === "O email informado já está cadastrado") {
        return setCurrentStep(0);
      }
    }

  }

  return (
    <form onSubmit={handleSignUpUser} className='form-signup'>
      <h1>Escolha uma senha</h1>
      <label htmlFor="password">Senha*</label>
      <div className="content-password">
        <img src={eyeOff} alt="eye off" onClick={() => setShowPassword(!showPassword)} />
        <input type={showPassword ? "text" : "password"} name="password" value={signUpForm.password} id="password" autoComplete='on' onChange={(e) => handleChangeForm(e)} />
      </div>
      <label htmlFor="confirmPassword">Repita a senha*</label>
      <div className="content-password">
        <img src={eyeOff} alt="eye off" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={signUpForm.confirmPassword} id="confirmPassword" autoComplete='on' onChange={(e) => handleChangeForm(e)} />
      </div>
      <button >Finalizar cadastro</button>
      <p>
        Já possui uma conta? Faça seu <span onClick={() => navigate("/")}>Login</span>
      </p>
    </form>
  )
}

export default FormStepTwo;
