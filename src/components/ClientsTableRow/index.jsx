import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import addChargeIcon from "../../assets/add-charge-icon.svg";
import defaulter from "../../assets/defaulter.svg";
import upToDate from "../../assets/up-to-date.svg";
import { formatCpfNumber, formatPhoneNumber } from '../../helpers/formatter';
import useDashboard from '../../hooks/useDashboard';
import NewChargeModal from '../NewChargeModal';
import './style.css';

function ClientsTableRow({ client }) {
  const { id, name, cpf, email, phone, up_to_date } = client;

  const { setClientDetails } = useDashboard();

  const navigate = useNavigate();

  async function handleClientDetails() {
    setClientDetails({});
    navigate(`/dashboard/clientes/${id}`);
  }

  const newChargeModalRef = useRef(null);

  const handleModalOpen = () => {
    newChargeModalRef.current.showModal();
  }

  return (
    <tr>
      <td className='clickable' onClick={handleClientDetails}>{name}</td>
      <td>{formatCpfNumber(cpf)}</td>
      <td>{email}</td>
      <td>{formatPhoneNumber(phone)}</td>
      <td><img src={up_to_date ? upToDate : defaulter} alt="status da cobrança" /></td>
      <td className='table-row-add-charge' >
        <img className='add-charge-img' src={addChargeIcon} alt="add cobrança" onClick={handleModalOpen} />
        <NewChargeModal newChargeRef={newChargeModalRef} client={client} />
      </td>
    </tr>
  )
}

export default ClientsTableRow;