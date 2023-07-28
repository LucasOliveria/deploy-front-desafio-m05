import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import successIcon from "../../assets/iconsucces.svg";
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import './style.css';


function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      return toast.info('E-mail obrigatório!');
    }

    if (!form.password) {
      return toast.info('Senha obrigatória!');
    }

    const id = toast.loading("Por favor, aguarde...");

    try {
      const response = await api.post('/login', {
        ...form
      });
      const { token, user } = response.data;
      setItem('token', token);

      toast.update(id, { render: `Bem-vindo(a) ${user.name}`, type: "success", isLoading: false, autoClose: 1500, icon: ({ theme, type }) => <img src={successIcon} /> });

      navigate('/dashboard/home');
    } catch (error) {
      return toast.update(id, { render: error.response.data, type: "error", isLoading: false, autoClose: 1500 });
    }
  }

  useEffect(() => {
    if (getItem("token")) {
      navigate('/dashboard/home');
    }
  }, []);

  return (
    <div className='signin-container'>
      <aside className='signin-container-aside'>
        <div>
          <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
        </div>
      </aside>
      <main className='signin-container-main'>
        <form onSubmit={handleSubmit} className='signin-form'>
          <h1 className='signin-form-title'>Faça seu login!</h1>
          <div className='signin-container-email'>
            <label htmlFor='email'>E-mail</label>
            <input type="email" name='email' id='email' placeholder='Digite seu e-mail' value={form.email} onChange={(e) => handleChangeForm(e)} />
          </div>
          <div className='signin-container-password'>
            <div>
              <label htmlFor="password">Senha</label>
              <Link to="#">Esqueceu a senha?</Link>
            </div>
            <input type="password" name='password' id='password' placeholder='Digite sua senha' value={form.password} onChange={(e) => handleChangeForm(e)} />
          </div>
          <button className='signin-btn-submit'>Entrar</button>
          <p>Ainda não possui uma conta?<span><Link to="/signup">Cadastre-se</Link></span></p>
        </form>
      </main>
    </div>
  )
}

export default SignIn;
