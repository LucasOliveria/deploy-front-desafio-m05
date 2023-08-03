import { useEffect, useState } from 'react';
import chargeIconTable from "../../assets/blank-charge.svg";
import changeOrder from "../../assets/change-order.svg";
import filterIcon from "../../assets/filter-icon.svg";
import searchIcon from "../../assets/search-icon.svg";
import useDashboard from '../../hooks/useDashboard';
import ChargesTableRow from '../ChargesTableRow';
import './style.css';

function ChargesTable() {
  const { charges } = useDashboard();

  const [search, setSearch] = useState('');

  const [filteredCharges, setFilteredCharges] = useState([]);

  function handleSearch(event) {
    const searchCharacter = event.target.value;

    setSearch(searchCharacter);
  }

  useEffect(() => {
    const filtered = charges.filter((charge) => {
      return charge.client_name.toLowerCase().startsWith(search.toLowerCase())
    });

    setFilteredCharges(filtered);
  }, [search, charges]);

  return (
    <div className="charges-container-table">
      <div className="charges-utility-bar">
        <div className="charges-icon-and-title">
          <img src={chargeIconTable} alt="client icon" />
          <h2>Cobranças</h2>
        </div>
        <div className="charges-content-utilities">
          <img src={filterIcon} alt="filter icon" />
          <div className="charges-search-input">
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

      <div className="charges-content-table">
        <table className='charges-table fade-in'>
          <thead className='charges-table-head'>
            <tr>
              <th>
                <img
                  src={changeOrder}
                  alt="change order"
                />
                <span>Cliente</span>
              </th>
              <th>
                <img
                  src={changeOrder}
                  alt="change order"
                />
                <span>ID Cob.</span>
              </th>
              <th>Valor</th>
              <th>Data de venc.</th>
              <th className='charges-situation'>Status</th>
              <th>Descrição</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!!filteredCharges.length &&
              filteredCharges.map((charge) => (
                <ChargesTableRow
                  key={charge.id}
                  charge={charge}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ChargesTable;
