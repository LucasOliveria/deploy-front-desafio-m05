import './style.css';
import success from '../../assets/success.png'

function SuccessRegistration() {
  return (
    <div className='succesRegistration-modal'>
      <img src={success} alt="" />
      <h1>Cadastro Alterado  com sucesso</h1>
    </div>
  )
}

export default SuccessRegistration;
