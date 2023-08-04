import { useState } from 'react';
import { toast } from 'react-toastify';
import close from '../../assets/close.jpg';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-on.svg';
import successIcon from "../../assets/iconsucces.svg";
import useDashboard from '../../hooks/useDashboard';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import SuccessRegistration from '../SuccesEditUser';
import './style.css';

function EditUser() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [successRegistration, setSuccessRegistration] = useState(false);

  const { formData, setFormData, setUser, user, setOpenEditUser } = useDashboard();

  const token = getItem('token');


  function handleChange(event) {
    let { name, value } = event.target;
    if (name === 'cpf') {
      if (isNaN(value)) {
        value = '';
      }
    }
    if (name === 'phone') {
      if (isNaN(value)) {
        value = '';
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Este campo deve ser preenchido';
    }
    if (!formData.email) {
      errors.email = 'Este campo deve ser preenchido';
    }
    if (!formData.password) {
      errors.password = 'Este campo deve ser preenchido';
    }
    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = 'Este campo deve ser preenchido';
    } else if (formData.password !== formData.confirmNewPassword) {
      errors.confirmNewPassword = 'As senhas não coincidem';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const id = toast.loading('Por favor, aguarde...');

    try {
      const response = await api.put('/user', {
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
        password: formData.password,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setUser(formData);

      toast.update(id, { render: response.data, type: "success", isLoading: false, autoClose: 1500, icon: ({ theme, type }) => <img src={successIcon} /> });

      setSuccessRegistration(true);

      return;
    } catch (error) {
      toast.update(id, { render: error.response.data, type: "error", isLoading: false, autoClose: 1500 });
      return;
    }

  };

  function handleCloseModal() {
    if (successRegistration) {
      setOpenEditUser(false);
      setSuccessRegistration(false);
    }
  }

  return (
    <div className='editUser' onClick={handleCloseModal}>
      {successRegistration ?
        <SuccessRegistration />
        :
        (<div className='editUser-modal' >
          <img
            className='close'
            src={close}
            alt='close'
            onClick={() => setOpenEditUser(false)}
          />
          <form onSubmit={handleSubmit}>
            <h1>Edite seu cadastro</h1>
            <label>
              Nome*
              <input
                type='text'
                name='name'
                placeholder='Digite seu nome'
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className='error-message'>{formErrors.name}</span>}
            </label>
            <label>
              Email*
              <input
                type='email'
                name='email'
                placeholder='Digite seu E-mail'
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
            </label>

            <div className='cpf-phone'>
              <label>
                CPF
                <input
                  type="text"
                  name="cpf"
                  maxLength={11}
                  minLength={11}
                  placeholder='Digite seu CPF'
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </label>
              <label>
                Telefone
                <input
                  type="text"
                  name="phone"
                  maxLength={11}
                  minLength={11}
                  placeholder='Digite seu Telefone'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label className='password-label'>
              Nova Senha*
              <div className='content-input-eye'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className={formErrors.password ? 'error' : ''}
                />
                <img className='eye' src={showPassword ? eyeOn : eyeOff} alt='eye' onClick={() => setShowPassword(!showPassword)} />
              </div>

              {formErrors.password && (
                <span className='error-message'>{formErrors.password}</span>
              )}
            </label>
            <label className='password-label'>

              Confirmar Senha*
              <div className='content-input-eye'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmNewPassword'
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className={formErrors.confirmNewPassword ? 'error' : ''}
                />
                <img className='eye' src={showConfirmPassword ? eyeOn : eyeOff} alt='eye' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              </div>
              {formErrors.confirmNewPassword && (
                <span className='error-message'>{formErrors.confirmNewPassword}</span>
              )}
            </label>
            <button type='submit'>Aplicar</button>
          </form>
        </div>)}

    </div>
  );
}

export default EditUser;

