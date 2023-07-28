import './style.css';
import addChargeIcon from "../../assets/add-charge-icon.svg";
import defaulter from "../../assets/defaulter.svg";
import upToDate from "../../assets/up-to-date.svg";
import { formatPhoneNumber, formatCpfNumber } from '../../helpers/formatter';

function ClientsTableRow({ client }) {
  const { name, cpf, email, phone, up_to_date } = client
  return (
    <tr>
      <td>{name}</td>
      <td>{formatCpfNumber(cpf)}</td>
      <td>{email}</td>
      <td>{formatPhoneNumber(phone)}</td>
      <td><img src={up_to_date ? upToDate : defaulter} alt="status da cobrança" /></td>
      <td><img src={addChargeIcon} alt="add cobrança" /></td>
    </tr>
  )
}

export default ClientsTableRow;