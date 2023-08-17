import iconModal from '../../assets/blank-charge.svg';
import iconClose from '../../assets/icon-close.svg';
import defeatedIcon from "../../assets/statusCharge/expired.svg";
import payIcon from "../../assets/statusCharge/paid.svg";
import pendingIcon from "../../assets/statusCharge/pending.svg";
import { formatCurrency } from '../../helpers/formatter';
import useDashboard from '../../hooks/useDashboard';
import './style.css';


export default function ChargeDetailModal() {
  const { setShowChargeDetailModal, chargeDetails } = useDashboard();

  function handleCloseModal() {
    setShowChargeDetailModal(false);
  }

  const { client_name, description, due_date, value, id, up_to_date } = chargeDetails;

  return (
    <div className="charge-detail-modal-background">
      <div className="charge-detail-modal-container">
        <header>
          <div className='header-modal'>
            <img src={iconModal} alt="Icone de Detalhe" />
            <h1>Detalhe da Cobrança</h1>
          </div>
          <img src={iconClose} alt="Botão de Fechar Modal" onClick={() => handleCloseModal()} />
        </header>
        <p className="charge-detail-modal-option">Nome</p>
        <div className='box-detail-value'>
          <p className="charge-detail-modal-value">{client_name}</p>
        </div>
        <p className="charge-detail-modal-option">Descrição</p>
        <div className='box-detail-value'>
          <p className="charge-detail-modal-value">{description}</p>
        </div>
        <div className="charge-detail-modal-row">
          <div>
            <p className="charge-detail-modal-option">Vencimento</p>
            <p className="charge-detail-modal-value">{due_date.slice(0, 10).split("-").reverse().join("/")}</p>
          </div>
          <div>
            <p className="charge-detail-modal-option">Valor</p>
            <p className="charge-detail-modal-value">{formatCurrency(value)}</p>
          </div>
        </div>
        <div className="charge-detail-modal-row">
          <div>
            <p className="charge-detail-modal-option">ID cobranças</p>
            <p className="charge-detail-modal-value">{id}</p>
          </div>
          <div>
            <p className="charge-detail-modal-option">Status</p>
            <img src={up_to_date === 'Paga' ? payIcon : up_to_date === 'Vencida' ? defeatedIcon : pendingIcon} alt="Vencida" />
          </div>
        </div>
      </div>
    </div>
  )
}
