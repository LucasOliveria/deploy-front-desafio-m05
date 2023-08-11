import { useNavigate } from 'react-router-dom';
import { formatTotalNumber } from '../../helpers/formatter';
import useDashboard from '../../hooks/useDashboard';
import TableRow from '../TableRow';
import './style.css';

function ChargesCard({ title, total, textColor, backgroundColor, body, up_to_date }) {
  const navigate = useNavigate();

  const { charges, setFilteredCharges, setFilterHomeCharges } = useDashboard();

  function handleWatch() {
    const localCharges = [...charges]
    const filteredCharges = localCharges.filter(charge => charge.up_to_date === up_to_date);
    setFilteredCharges(filteredCharges);
    setFilterHomeCharges(true);
    navigate('/dashboard/cobrancas')
  }

  return (
    <div className='chargesCard'>
      <div className='top'>
        <h1>{title}</h1>
        <div className='top-nmr'
          style={{
            color: `${textColor}`,
            backgroundColor: `${backgroundColor}`
          }}
        >
          <h3>{formatTotalNumber(total)}</h3>
        </div>
      </div>
      <div className='content-chargeCard-table'>
        <table className='table'>
          <thead>
            <tr >
              <th>Cliente</th>
              <th>ID da Cob.</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {body?.length ? body?.length && body?.slice(0, 4).map((client) => (
              <TableRow key={client.id} name={client.client_name} id={client.id} value={client.value} />
            ))
              :
              <tr>
                <td className='no-content'></td>
                <td className='no-content'></td>
                <td className='no-content'></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div className='bottom'>
        <h3 onClick={handleWatch}>Ver todos</h3>
      </div>
    </div >
  )
}

export default ChargesCard;
