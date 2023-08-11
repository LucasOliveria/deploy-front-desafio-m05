import { formatCurrency } from '../../helpers/formatter';
import './style.css';

function TableRow({ name, id, value }) {
  return (
    <tr>
      <td className='td-name'>{name}</td>
      <td>{id}</td>
      <td className='td-value'>{formatCurrency(value)}</td>
    </tr>

  )
}

export default TableRow;
