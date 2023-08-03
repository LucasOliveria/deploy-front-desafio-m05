
import { useEffect } from 'react';
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
  const { clients, setClients } = useDashboard();
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [rotate, setRotate] = useState(false)
  useEffect(() => {
    const filtered = clients.filter((client) => {
      return client.name.toLowerCase().startsWith(search.toLowerCase())
    });
    setFilteredClients(filtered);

  }, [search, clients]);


  function handleAlphabeticalOrder() {
    setRotate(!rotate);
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedClients = [...filteredClients];

    sortedClients.sort((a, b) => {
      const nomeA = a.name.toUpperCase();
      const nomeB = b.name.toUpperCase();

      if (newSortOrder === 'asc') {
        return nomeA.localeCompare(nomeB);
      } else {
        return nomeB.localeCompare(nomeA);
      }
    });
    setClients(sortedClients);
  }

  function handleSearch(event) {
    const searchCharacter = event.target.value;
    setSearch(searchCharacter);
  }


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
          <img src={filterIcon} alt="filter icon" />
          <div className="search-input">
            <input
              type="text"
              name="search"
              id=""
              placeholder='Pesquisa'
              onChange={handleSearch}
              value={search}
            />
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
      </div>

      <div className="content-clients-table">
        <table className='clients-table fade-in'>
          <thead>
            <tr>
              <th>
                <img
                  src={changeOrder}
                  alt="change order"
                  onClick={handleAlphabeticalOrder}
                  className={`${rotate ? 'rotate' : 'rotate-reverse'}`}
                />
                <span>Cliente</span>
              </th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criar Cobrança</th>
            </tr>
          </thead>
          <tbody>
            {!!filteredClients.length &&
              filteredClients.map((client) => (
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
