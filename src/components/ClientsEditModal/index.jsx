import { useState } from 'react';
import { toast } from "react-toastify";
import clientIcon from "../../assets/client-icon-table.svg";
import closeIcon from "../../assets/icon-close.svg";
import successIcon from "../../assets/iconsucces.svg";
import useDashboard from '../../hooks/useDashboard';
import api from "../../services/api";
import { getZipCode } from '../../services/getZipCode';
import { getItem } from "../../utils/storage";
import './style.css';

function ClientsEditModal() {
  const token = getItem("token");

  const {setShowModalEditClient} = useDashboard();

  const [errorName, setErrorName] = useState('');

  const [errorEmail, setErrorEmail] = useState('');

  const [errorCpf, setErrorCpf] = useState('');

  const [errorPhone, setErrorPhone] = useState('');

  const { clients, setClients, charges, setCharges, clientDetails, setClientDetails, setHomeModifier } = useDashboard();

  const { client: clientCurrent } = clientDetails;

  const [form, setForm] = useState({
    name: clientCurrent.name,
    email: clientCurrent.email,
    cpf: clientCurrent.cpf,
    phone: clientCurrent.phone,
    address: clientCurrent.public_place || "",
    complement: clientCurrent.complement || "",
    zipCode: clientCurrent.zip_code || "",
    district: clientCurrent.district || "",
    city: clientCurrent.city || "",
    uf: clientCurrent.uf || "",
  });

  const handleChangeForm = (e) => {
    if (e.target.name === 'cpf' && isNaN(e.target.value)) {
      return;
    }
    if (e.target.name === 'phone' && isNaN(e.target.value)) {
      return;
    }
    if (e.target.name === 'zipCode' && isNaN(e.target.value)) {
      return;
    }
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
    setShowModalEditClient(false);
  }

  const clearError = () => {
    setErrorName('');
    setErrorEmail('');
    setErrorCpf('');
    setErrorPhone('');
  }

  const checkZipCode = async (code) => {
    try {
      const response = await getZipCode.get(`/${code}/json/`);
      const { bairro, logradouro, localidade, uf } = await response.data;

      setForm({ ...form, address: logradouro, district: bairro, city: localidade, uf: uf });
    } catch (error) {
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!form.name) {
      setErrorName('Este campo deve ser preenchido');
    }

    if (!form.email) {
      setErrorEmail('Este campo deve ser preenchido');
    }

    if (isNaN(form.cpf) || form.cpf.length !== 11) {
      setErrorCpf('O campo cpf deve ser composto por 11 números');
    }

    if (!form.cpf) {
      setErrorCpf('Este campo deve ser preenchido');
    }

    if (isNaN(form.phone) || form.phone.length !== 11) {
      setErrorPhone('O campo telefone deve ser composto por 11 números');
    }

    if (!form.phone) {
      setErrorPhone('Este campo deve ser preenchido');
    }

    if (!form.name || !form.email || !form.cpf || !form.phone) {
      return
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

    const id = toast.loading("Por favor, aguarde...");

    try {
      const response = await api.put(`/client/${clientCurrent.id}`, {
        ...newClient
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedClient = response.data;

      const localClients = [...clients];

      const clientForUpdate = localClients.find((client) => client.id === updatedClient.id);

      clientForUpdate.name = updatedClient.name
      clientForUpdate.email = updatedClient.email
      clientForUpdate.cpf = updatedClient.cpf
      clientForUpdate.phone = updatedClient.phone
      clientForUpdate.public_place = updatedClient.public_place
      clientForUpdate.complement = updatedClient.complement
      clientForUpdate.zip_code = updatedClient.zip_code
      clientForUpdate.district = updatedClient.district
      clientForUpdate.city = updatedClient.city
      clientForUpdate.uf = updatedClient.uf

      setClients(localClients);

      const localCharges = [...charges];

      const updatedClientCharges = localCharges.filter((charge) => charge.client_id === updatedClient.id)

      for (const updatedClientCharge of updatedClientCharges) {
        updatedClientCharge.client_name = updatedClient.name
      }

      setCharges(localCharges);

      setClientDetails({ ...clientDetails, client: { ...updatedClient } });

      setHomeModifier(updatedClient);

      handleBtnCancel();

      toast.update(id, { render: "Cliente atualizado com sucesso", type: "success", isLoading: false, autoClose: 1500, position: "bottom-right", icon: ({ theme, type }) => <img src={successIcon} /> });

    } catch (error) {
      if (error.response.data.includes('e-mail não está')) {
        setErrorEmail('O campo e-mail não está em um formato válido');
      }
      if (error.response.data.includes('O email informado já está cadastrado.')) {
        setErrorEmail('E-mail já cadastrado');
      }
      if (error.response.data.includes('CPF')) {
        setErrorCpf('CPF já cadastrado');
      }
      if (errorCpf || errorEmail || errorPhone) {
        return toast.update(id, { render: "Preencha as informações corretamente", type: "error", isLoading: false, autoClose: 1500 });
      }

      toast.update(id, { render: "Não foi possível cadastrar o cliente, verifique se todas as informações estão corretas", type: "error", isLoading: false, autoClose: 1500 });
    }

  }
  return (
    <main className='edit-modal-container'>
      <form className='edit-modal-form' onSubmit={handleSubmit}>

        <div className="edit-modal-header">
          <div className="edit-modal-row">
            <img src={clientIcon} alt="Icone Cliente" />
            <h1>Editar Cliente</h1>
          </div>
          <img src={closeIcon} alt="Fechar modal" onClick={() => setShowModalEditClient(false)} className='edit-modal-close' />
        </div>

        <label htmlFor="input-name">Nome*</label>
        <input type="text" className={`edit-modal-form-input ${errorName ? 'edit-modal-error-border-input' : ''}`} placeholder='Digite o nome' id='input-name' name='name' value={form.name} onChange={(e) => handleChangeForm(e)} />
        <span className='edit-modal-error'>{errorName}</span>

        <label htmlFor="input-email">Email*</label>
        <input type="email" className={`edit-modal-form-input ${errorEmail ? 'edit-modal-error-border-input' : ''}`} placeholder='Digite o e-mail' id='input-email' name='email' value={form.email} onChange={(e) => handleChangeForm(e)} />
        <span className='edit-modal-error'>{errorEmail}</span>

        <div className="edit-modal-row">
          <div className='edit-modal-row-col'>
            <label htmlFor="input-cpf">CPF*</label>
            <input type="text" className={`edit-modal-form-input smaller-input ${errorCpf ? 'edit-modal-error-border-input' : ''}`} minLength={11} maxLength={11} placeholder='Digite o cpf' id='input-cpf' name='cpf' value={form.cpf} onChange={(e) => handleChangeForm(e)} />
            <span className='edit-modal-error'>{errorCpf}</span>
          </div>

          <div className='edit-modal-row-col'>
            <label htmlFor="input-phone">Telefone*</label>
            <input type="text" className={`edit-modal-form-input smaller-input  ${errorPhone ? 'edit-modal-error-border-input' : ''}`} minLength={11} maxLength={11} placeholder='Digite o telefone' id='input-phone' name='phone' value={form.phone} onChange={(e) => handleChangeForm(e)} />
            <span className='edit-modal-error'>{errorPhone}</span>
          </div>
        </div>

        <label htmlFor="input-address">Endereço</label>
        <input type="text" className='edit-modal-form-input' placeholder='Digite o endereço' id='input-address' name='address' value={form.address} onChange={(e) => handleChangeForm(e)} />

        <label htmlFor="input-complement">Complemento</label>
        <input type="text" className='edit-modal-form-input' placeholder='Digite o complemento' id='input-complement' name='complement' value={form.complement} onChange={(e) => handleChangeForm(e)} />

        <div className="edit-modal-row">
          <div className='edit-modal-row-col'>
            <label htmlFor="input-zipCode">CEP</label>
            <input type="text" className='edit-modal-form-input smaller-input' maxLength={8} onBlur={() => checkZipCode(form.zipCode)} placeholder='Digite o CEP' id='input-zipCode' name='zipCode' value={form.zipCode} onChange={(e) => handleChangeForm(e)} />
          </div>

          <div className='edit-modal-row-col'>
            <label htmlFor="input-district">Bairro</label>
            <input type="text" className='edit-modal-form-input smaller-input' placeholder='Digite o bairro' id='input-district' name='district' value={form.district} onChange={(e) => handleChangeForm(e)} />
          </div>
        </div>

        <div className="edit-modal-row">
          <div className='edit-modal-row-col-asymmetric'>
            <label htmlFor="input-city">Cidade</label>
            <input type="text" className='edit-modal-form-input' placeholder='Digite a cidade' id='input-city' name='city' value={form.city} onChange={(e) => handleChangeForm(e)} />
          </div>

          <div className='edit-modal-row-col'>
            <label htmlFor="input-uf">UF</label>
            <input type="text" className='edit-modal-form-input smaller-input' placeholder='Digite a UF' id='input-uf' name='uf' value={form.uf} onChange={(e) => handleChangeForm(e)} />
          </div>
        </div>

        <div className="edit-modal-row-btn">
          <button type='button' className='edit-modal-btn-cancel' onClick={handleBtnCancel}>Cancelar</button>
          <button className='edit-modal-btn-confirm'>Aplicar</button>
        </div>
      </form>
    </main>
  )
}

export default ClientsEditModal;
