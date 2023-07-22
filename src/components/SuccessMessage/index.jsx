import { useNavigate } from 'react-router-dom';
import StepsBottom from "../StepsBottom";
import success from "../../assets/success.png";
import './style.css';

function SuccessMessage() {
  const navigate = useNavigate();

  return (
    <div className='container-success'>
      <div className='success-message'>
        <img src={success} alt="success" />
        <h2>Cadastro realizado com sucesso!</h2>
      </div>
      <button onClick={() => navigate("/")}>Ir para Login</button>

      <StepsBottom stepLine={2} />
    </div>
  )
}

export default SuccessMessage;
