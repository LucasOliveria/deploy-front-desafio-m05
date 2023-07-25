import './style.css';
import close from '../../assets/close.jpg';
import eye from '../../assets/eye-off.svg';
import SuccessRegistration from '../SuccesEditUser';
import { useState } from 'react';

function EditUser() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    novaSenha: '',
    confirmarSenha: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successRegistration, setSuccessRegistration] = useState(false);
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.nome) {
      errors.nome = 'Este campo deve ser preenchido';
    }
    if (!formData.email) {
      errors.email = 'Este campo deve ser preenchido';
    }
    if (!formData.novaSenha) {
      errors.novaSenha = 'Este campo deve ser preenchido';
    }
    if (!formData.confirmarSenha) {
      errors.confirmarSenha = 'Este campo deve ser preenchido';
    } else if (formData.novaSenha !== formData.confirmarSenha) {
      errors.confirmarSenha = 'As senhas não coincidem';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Valores dos campos:');
      console.log(formData);
      setSuccessRegistration(true);
    }
  };
  return (
    <div className='editUser'>
      {successRegistration ?
        <SuccessRegistration />
        :
        (<div className='editUser-modal'>
          <img
            className='close'
            src={close}
            alt='close'
          />
          <form onSubmit={handleSubmit}>
            <h1>Edite seu cadastro</h1>
            <label>
              Nome*
              <input
                type='text'
                name='nome'
                id='nome'
                placeholder='Digite seu nome'
                value={formData.nome}
                onChange={handleChange}
                className={formErrors.nome ? 'error' : ''}
              />
              {formErrors.nome && <span className='error-message'>{formErrors.nome}</span>}
            </label>
            <label>
              Email*
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Digite seu E-mail'
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
            </label>

            <div className='cpf-phone'>
              <label>
                CPF*
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder='Digite seu CPF'
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </label>
              <label>
                Telefone*
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder='Digite seu Telefone'
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label className='password-label'>
              Nova Senha*
              <div className='content-input-eye'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='novaSenha'
                  id='novaSenha'
                  value={formData.novaSenha}
                  onChange={handleChange}
                  className={formErrors.novaSenha ? 'error' : ''}
                />
                <img className='eye' src={eye} alt='eye' onClick={handleTogglePassword} />
              </div>

              {formErrors.novaSenha && (
                <span className='error-message'>{formErrors.novaSenha}</span>
              )}
            </label>
            <label className='password-label'>

              Confirmar Senha*
              <div className='content-input-eye'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='confirmarSenha'
                  id='confirmarSenha'
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={formErrors.confirmarSenha ? 'error' : ''}
                />
                <img className='eye' src={eye} alt='eye' onClick={handleTogglePassword} />
              </div>
              {formErrors.confirmarSenha && (
                <span className='error-message'>{formErrors.confirmarSenha}</span>
              )}
            </label>
            <div className='center-button'>
              <button type='submit'>Aplicar</button>
            </div>
          </form>
        </div>)}

    </div>
  );
}

export default EditUser;

