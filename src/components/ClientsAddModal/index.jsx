import './style.css';
import clientIcon from "../../assets/client-icon-table.svg"
import closeIcon from "../../assets/icon-close.svg"
import { useState } from 'react';
import { toast } from "react-toastify";
import api from "../../services/api";
import { getItem } from "../../utils/storage";

function ClientsAddModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    complement: '',
    zipCode: '',
    district: '',
    city: '',
    uf: '',
  });
  const token = getItem("token");

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBtnCancel = () => {
    setForm({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      address: '',
      complement: '',
      zipCode: '',
      district: '',
      city: '',
      uf: '',
    });
    onClose();
  }

  const checkZipCode = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      return toast.error('O campo nome é obrigatório');
    }
    if (!form.email) {
      return toast.error('O campo e-mail é obrigatório');
    }
    if (!form.cpf) {
      return toast.error('O campo cpf é obrigatório');
    }
    if (!form.phone) {
      return toast.error('O campo telefone é obrigatório');
    }
    if (isNaN(form.cpf) || form.cpf.length !== 11) {
      return toast.error('O campo cpf deve ser composto por 11 números');
    }
    if (isNaN(form.phone) || form.phone.length !== 11) {
      return toast.error('O campo telefone deve ser composto por 11 números');
    }

    const newClient = {
      name: form.name,
      email: form.email,
      cpf: form.cpf,
      phone: form.phone,
      public_place: form.address,
      complement: form.complement,
      zip_code: form.zipCode,
      district: form.district,
      city: form.city,
      uf: form.uf,
    }
    // console.log(newClient);
    try {
      await api.post("/client", {
        ...newClient
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      handleBtnCancel();
    } catch (error) {
      return toast.error(error.response.data);
    }

  }
  return (
    <main className='add-modal-container'>
      <form className='add-modal-form' onSubmit={handleSubmit}>
        <div className="add-modal-header">
          <div className="add-modal-row">
            <img src={clientIcon} alt="Icone Cliente" />
            <h1>Cadastro de Cliente</h1>
          </div>
          <img src={closeIcon} alt="Fechar modal" onClick={onClose} className='add-modal-close' />
        </div>
        <label htmlFor="input-name">Nome*</label>
        <input type="text" placeholder='Digite o nome' id='input-name' name='name' value={form.name} onChange={(e) => handleChangeForm(e)} />
        <span className='add-modal-name-error'></span>
        <label htmlFor="input-email">Email*</label>
        <input type="email" placeholder='Digite o e-mail' id='input-email' name='email' value={form.email} onChange={(e) => handleChangeForm(e)} />
        <span className='add-modal-email-error'></span>
        <div className="add-modal-row">
          <div className='add-modal-row-col'>
            <label htmlFor="input-cpf">CPF*</label>
            <input type="text" placeholder='Digite o cpf' id='input-cpf' name='cpf' value={form.cpf} onChange={(e) => handleChangeForm(e)} />
            <span className='add-modal-cpf-error'></span>
          </div>
          <div className='add-modal-row-col'>
            <label htmlFor="input-phone">Telefone*</label>
            <input type="text" placeholder='Digite o telefone' id='input-phone' name='phone' value={form.phone} onChange={(e) => handleChangeForm(e)} />
            <span className='add-modal-phone-error'></span>
          </div>
        </div>
        <label htmlFor="input-address">Endereço</label>
        <input type="text" placeholder='Digite o endereço' id='input-address' name='address' value={form.address} onChange={(e) => handleChangeForm(e)} />
        <label htmlFor="input-complement">Complemento</label>
        <input type="text" placeholder='Digite o complemento' id='input-complement' name='complement' value={form.complement} onChange={(e) => handleChangeForm(e)} />
        <div className="add-modal-row">
          <div className='add-modal-row-col'>
            <label htmlFor="input-zipCode">CEP</label>
            <input type="text" placeholder='Digite o zipCode' id='input-zipCode' onBlur={checkZipCode} name='zipCode' value={form.zipCode} onChange={(e) => handleChangeForm(e)} />
          </div>
          <div className='add-modal-row-col'>
            <label htmlFor="input-district">Bairro</label>
            <input type="text" placeholder='Digite o bairro' id='input-district' name='district' value={form.district} onChange={(e) => handleChangeForm(e)} />
          </div>
        </div>
        <div className="add-modal-row">
          <div className='add-modal-row-col'>
            <label htmlFor="input-city">Cidade</label>
            <input type="text" placeholder='Digite a cidade' id='input-city' name='city' value={form.city} onChange={(e) => handleChangeForm(e)} />
          </div>
          <div className='add-modal-row-col'>
            <label htmlFor="input-uf">UF</label>
            <input type="text" placeholder='Digite a UF' id='input-uf' name='uf' value={form.uf} onChange={(e) => handleChangeForm(e)} />
          </div>
        </div>
        <div className="add-modal-row-btn">
          <button type='button' className='add-modal-btn-cancel' onClick={handleBtnCancel}>Cancelar</button>
          <button className='add-modal-btn-confirm'>Aplicar</button>
        </div>
      </form>
    </main>
  )
}

export default ClientsAddModal;
