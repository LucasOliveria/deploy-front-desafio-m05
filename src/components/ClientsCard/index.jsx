import { formatTotalNumber } from '../../helpers/formatter';
import './style.css';
function ClientsCard({ icon, title, total, textColor, backgroundColor, body }) {
  return (
    <div className='client-card'>
      <div className='top'>
        <div className='top-left'>
          <img src={icon} alt="frame" />
          <h1>{title}</h1>
        </div>
        <div className='top-nmr' style={{
          backgroundColor: `${backgroundColor}`
        }}>
          <h3 style={{
            color: `${textColor}`
          }}
          >{formatTotalNumber(total)}</h3>
        </div>
      </div>
      <div className='content-clientscard-table'>
        <table className='table'>
          <thead>
            <tr >
              <th>Clientes</th>
              <th>ID do clie.</th>
              <th>CPF</th>
            </tr>
          </thead>
          <tbody>
            {body?.length ? body?.length && body?.slice(0, 4).map((client) => (
              <tr key={client.id}>
                <td className='first'>{client.name}</td>
                <td className='second'>{client.id}</td>
                <td className='third'>{client.cpf}</td>
              </tr>
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
        <h3>Ver todos</h3>
      </div>
    </div>
  )
}

export default ClientsCard;
