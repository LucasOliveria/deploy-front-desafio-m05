// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { toast } from "react-toastify";
import imgLogin from '../../assets/unsplash_QeVmJxZOv3k.svg';
import { useState } from 'react';

function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error('E-mail e senha são obrigatórios!')
    }
    // try {} catch (error) {}
  }
  return (
    <div className='container'>
      <aside className='container-aside'>
        <img src={imgLogin} alt="Imagem Login" />
        <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
      </aside>
      <main className='container-main'>
        <form onSubmit={handleSubmit}>
          <h1>Faça seu login!</h1>
          <div className='container-email'>
            <label htmlFor='email'>E-mail</label>
            <input type="email" name='email' id='email' placeholder='Digite seu e-mail' value={form.email} onChange={(e) => handleChangeForm(e)} />
          </div>
          <div className='container-password'>
            <div>
              <label htmlFor="password">Senha</label>
              <Link to="#">Esqueceu a senha?</Link>
            </div>
            <input type="password" name='password' id='password' placeholder='Digite sua senha' value={form.password} onChange={(e) => handleChangeForm(e)} />
          </div>
          <button className='btn-submit'>Entrar</button>
          <p>Ainda não possui uma conta?<span><Link to="/signup">Cadastre-se</Link></span></p>
        </form>
      </main>
    </div>
  )
}

export default SignIn;
