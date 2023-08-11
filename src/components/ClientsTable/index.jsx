import { useEffect, useState } from 'react';
import changeOrder from "../../assets/change-order.svg";
import clientIconTable from "../../assets/client-icon-table.svg";
import filterIcon from "../../assets/filter-icon.svg";
import notResults from '../../assets/notResults.png';
import searchIcon from "../../assets/search-icon.svg";
import useDashboard from '../../hooks/useDashboard';
import ClientsAddModal from '../ClientsAddModal';
import ClientsTableRow from '../ClientsTableRow';
import './style.css';

function ClientsTable() {
  const [showModal, setShowModal] = useState(false);

  const [rotate, setRotate] = useState(false);

  const [searchClient, setSearchClient] = useState('');
  
  const { clients, setClients, sortOrder, setSortOrder, filteredClients, setFilteredClients, filterHomeClients, setFilterHomeClients } = useDashboard();

  const [copyClients, setCopyClients] = useState([...clients]);

  const [copyFilteredClients, setCopyFilteredClients] = useState([...filteredClients]);

  const filtered = searchClient ? copyClients.filter((client) => {
    return client.name.toLowerCase().startsWith(searchClient.toLowerCase()) || client.cpf.startsWith(searchClient) || client.email.startsWith(searchClient)
  }) : clients;

  const filteredbyFiltered = searchClient ? copyFilteredClients.filter((client) => {
    return client.name.toLowerCase().startsWith(searchClient.toLowerCase()) || client.cpf.startsWith(searchClient) || client.email.startsWith(searchClient)
  }) : filteredClients

  useEffect(() => {
    return () => {
      setFilterHomeClients(false);
    }
  }, []);

  function handleAlphabeticalOrder() {
    setRotate(!rotate);
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedClients = [...filtered];
    const sortedClientsFiltered = [...filteredbyFiltered];

    if (!filterHomeClients) {
      sortedClients.sort((a, b) => {
        const nomeA = a.name.toUpperCase();
        const nomeB = b.name.toUpperCase();

        if (newSortOrder === 'asc') {
          return nomeA.localeCompare(nomeB);
        } else {
          return nomeB.localeCompare(nomeA);
        }
      });

      if (searchClient) {
        return setCopyClients(sortedClients)
      }

     setClients(sortedClients);
    } else {
      sortedClientsFiltered.sort((a, b) => {
        const nomeA = a.name.toUpperCase();
        const nomeB = b.name.toUpperCase();

        if (newSortOrder === 'asc') {
          return nomeA.localeCompare(nomeB);
        } else {
          return nomeB.localeCompare(nomeA);
        }
      });

      if (searchClient) {
        return setCopyFilteredClients(sortedClientsFiltered);
      }
      
      setFilteredClients(sortedClientsFiltered);
    }

  }

  function handleSearch(event) {
    const searchCharacter = event.target.value;
    setSearchClient(searchCharacter);

    if (!searchClient) {
      setCopyClients([...clients]);
      setCopyFilteredClients([...filteredClients]);
    }
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
              value={searchClient}
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
            {!filterHomeClients
              ?
              !!filtered.length &&
              filtered.map((client) => (
                <ClientsTableRow key={client.id} client={client} />
              ))
              :
              filteredbyFiltered.map((client) => (
                <ClientsTableRow key={client.id} client={client} />
              ))
            }
          </tbody>
        </table>
        {!filtered.length &&
          <div className='not-results'>
            <img src={notResults} alt="not results" />
          </div>}
      </div>
      {showModal && <ClientsAddModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default ClientsTable;