import { useState } from 'react';
import addChargeIcon from "../../assets/add-charge-icon.svg";
import changeOrder from "../../assets/change-order.svg";
import clientIconTable from "../../assets/client-icon-table.svg";
import defaulter from "../../assets/defaulter.svg";
import filterIcon from "../../assets/filter-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import upToDate from "../../assets/up-to-date.svg";
import ClientsAddModal from '../ClientsAddModal';
import './style.css';


function ClientsTable() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container-clients-table">
      <div className="utility-bar">

        <div className="icon-and-title">
          <img src={clientIconTable} alt="client icon" />
          <h2>Clientes</h2>
        </div>

        <div className="content-utilities">
          <button className='add-client-button' onClick={() => setShowModal(true)}>
            + Adicionar cliente
          </button>

          <img src={filterIcon} alt="filter icon " />

          <div className="search-input">
            <input type="text" name="search" id="" placeholder='Pesquisa' />
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
      </div>

      <div className="content-clients-table">
        <table className='clients-table'>
          <thead>
            <tr>
              <th>
                <img src={changeOrder} alt="change order" />
                Cliente
              </th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criar Cobrança</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sara da Silva</td>
              <td>054 365 255 87</td>
              <td>sarasilva@cubos.io</td>
              <td>71 9 9462 8654</td>
              <td><img src={defaulter} alt="defalter" /></td>
              <td><img src={addChargeIcon} alt="add charge" /></td>
            </tr>
            <tr>
              <td>Cameron Williamson</td>
              <td>054 365 255 87</td>
              <td>cameronw@cubos.io</td>
              <td>71 9 9962 8658</td>
              <td><img src={defaulter} alt="defalter" /></td>
              <td><img src={addChargeIcon} alt="add charge" /></td>
            </tr>
            <tr>
              <td>Savannah Nguyen</td>
              <td>054 365 255 87</td>
              <td>snguyen@cubos.io</td>
              <td>71 9 9762 8658</td>
              <td><img src={upToDate} alt="up to date" /></td>
              <td><img src={addChargeIcon} alt="add charge" /></td>
            </tr>
            <tr>
              <td>Savannah Nguyen</td>
              <td>054 365 255 87</td>
              <td>snguyen@cubos.io</td>
              <td>71 9 9762 8658</td>
              <td><img src={upToDate} alt="up to date" /></td>
              <td><img src={addChargeIcon} alt="add charge" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      {showModal && <ClientsAddModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default ClientsTable;
