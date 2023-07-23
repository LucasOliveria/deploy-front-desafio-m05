import TableRow from '../TableRow';
import './style.css';
function ChargesCard() {
  return (
    <div className='chargesCard'>
      <div className='top'>
        <h1>Cobranças Pagas</h1>
        <div className='top-nmr'>
          <h3>10</h3>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr >
            <th>Cliente</th>
            <th>ID da Cob.</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
      <div className='bottom'>
        <h3>Ver todos</h3>
      </div>
    </div >
  )
}

export default ChargesCard;
