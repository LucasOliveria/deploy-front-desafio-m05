import { useState } from 'react';
import changeOrder from "../../assets/change-order.svg";
import clientIconTable from "../../assets/client-icon-table.svg";

import filterIcon from "../../assets/filter-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import useDashboard from '../../hooks/useDashboard';
import ClientsAddModal from '../ClientsAddModal';
import ClientsTableRow from '../ClientsTableRow';
import './style.css';


function ClientsTable() {
  const [showModal, setShowModal] = useState(false);
  const { clients } = useDashboard()

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
            {!!clients.length &&
              clients.map((client) => (
                <ClientsTableRow key={client.id} client={client} />
              ))
            }
          </tbody>
        </table>
      </div>
      {showModal && <ClientsAddModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default ClientsTable;
