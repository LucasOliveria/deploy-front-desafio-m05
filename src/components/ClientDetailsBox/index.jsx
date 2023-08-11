import editIconSmall from "../../assets/edit-icon-small.svg";
import { formatCpfNumber, formatPhoneNumber } from "../../helpers/formatter";
import useDashboard from "../../hooks/useDashboard";
import './style.css';


function ClientDetailsBox() {
  const { clientDetails, setShowModalEditClient } = useDashboard();

  return (
    <div className="content-client-details fade-in">
      <div className='title-client-details'>
        <h3>Dados do cliente</h3>
        <button onClick={() => setShowModalEditClient(true)}>
          <img src={editIconSmall} alt="edit icon" />
          Editar Cliente
        </button>
      </div>

      <div className="info-field-one">
        <div className='info'>
          <h4>E-mail</h4>
          <p className='email-client-details'>{clientDetails.client?.email}</p>
        </div>

        <div className='info'>
          <h4>Telefone</h4>
          <p>{formatPhoneNumber(clientDetails.client?.phone)}</p>
        </div>

        <div className='info'>
          <h4>CPF</h4>
          <p>{formatCpfNumber(clientDetails.client?.cpf)}</p>
        </div>
        <div className='info'>
        </div>
        <div className='info'>
        </div>
        <div className='info'>
        </div>
      </div>

      <div className="info-field-two">
        <div className='info'>
          <h4>Endereço</h4>
          <p>{clientDetails.client?.public_place}</p>
        </div>
        <div className='info'>
          <h4>Bairro</h4>
          <p>{clientDetails.client?.district}</p>
        </div>
        <div className='info'>
          <h4>Complemento</h4>
          <p>{clientDetails.client?.complement}</p>
        </div>
        <div className='info'>
          <h4>CEP</h4>
          <p>{clientDetails.client?.zip_code}</p>
        </div>
        <div className='info'>
          <h4>Cidade</h4>
          <p>{clientDetails.client?.city}</p>
        </div>
        <div className='info'>
          <h4>UF</h4>
          <p>{clientDetails.client?.uf}</p>
        </div>
      </div>

    </div>
  )
}

export default ClientDetailsBox;
