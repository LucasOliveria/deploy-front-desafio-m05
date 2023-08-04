import defeatedIcon from "../../assets/statusCharge/expired.svg";
import payIcon from "../../assets/statusCharge/paid.svg";
import pendingIcon from "../../assets/statusCharge/pending.svg";
import editIcon from "../../assets/tableCharge/btn-edit.svg";
import trashIcon from "../../assets/tableCharge/btn-excluir.svg";
import { formatCurrency, formatDate } from '../../helpers/formatter';
import useDashboard from '../../hooks/useDashboard';
import './style.css';


function ChargesTableRow({ charge, renderClientName = true }) {

  const { id, client_name, description, due_date, up_to_date, value } = charge;
  const { handleNewChargeModalOpen, setEditingCharge } = useDashboard()

  const formattedDate = formatDate(due_date, 'dd/MM/yyyy')

  const handleEditModalOpen = () => {
    const client = { id, name: client_name }
    setEditingCharge(charge)
    handleNewChargeModalOpen(client, true)
  }

  return (
    <tr className='ChargesTableRow'>
      {renderClientName && <td className='client-name'>{client_name}</td>}
      <td>{id}</td>
      <td>{formatCurrency(value)}</td>
      <td>{formattedDate}</td>
      <td className="charge-status">
        <img src={up_to_date === 'Paga' ? payIcon : up_to_date === 'Vencida' ? defeatedIcon : pendingIcon} alt="status da cobrança" />
      </td>
      <td className='description'>
        <span className='description-text'>
          {description}
        </span>
      </td>
      <td>
        <div className='icon-div' onClick={handleEditModalOpen}>
          <img className='icon-img' src={editIcon} alt="edit cobrança" />
          <span className='icon-text'>Editar</span>
        </div>
      </td>
      <td>
        <div className='icon-div'>
          <img className='icon-img' src={trashIcon} alt="edit cobrança" />
          <span className='icon-text delete'>Excluir</span>
        </div>
      </td>
    </tr>
  )
}

export default ChargesTableRow;
