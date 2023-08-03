import { formatCurrency } from '../../helpers/formatter';
import './style.css';

function TableRow({ name, idCharge, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{idCharge}</td>
      <td>{formatCurrency(value)}</td>
    </tr>

  )
}

export default TableRow;
