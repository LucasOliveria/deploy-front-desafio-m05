import './style.css';
import frame from '../../assets/Frame.jpg'
function ClientsCard() {
  return (
    <div className='client-card'>
      <div className='top'>
        <div className='top-left'>
          <img src={frame} alt="frame" />
          <h1>Clientes do Dia</h1>
        </div>
        <div className='top-nmr'>
          <h3>10</h3>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr >
            <th>Clientes</th>
            <th>ID do clie.</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='first'>Cameron Williamson</td>
            <td className='second'>223456787</td>
            <td className='third'>041.477.456-56</td>
          </tr>
          <tr>
            <td>Cameron Williamson</td>
            <td>223456787</td>
            <td>041.477.456-56</td>
          </tr>
          <tr>
            <td>Cameron Williamson</td>
            <td>223456787</td>
            <td>041.477.456-56</td>
          </tr>
          <tr>
            <td>Cameron Williamson</td>
            <td>223456787</td>
            <td>041.477.456-56</td>
          </tr>
        </tbody>
      </table>
      <div className='bottom'>
        <h3>Ver todos</h3>
      </div>
    </div>
  )
}

export default ClientsCard;
