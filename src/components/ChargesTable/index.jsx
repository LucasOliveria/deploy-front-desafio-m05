import { useEffect, useState } from 'react';
import chargeIconTable from "../../assets/blank-charge.svg";
import changeOrder from "../../assets/change-order.svg";
import filterIcon from "../../assets/filter-icon.svg";
import notResults from '../../assets/notResults.png';
import searchIcon from "../../assets/search-icon.svg";
import useDashboard from '../../hooks/useDashboard';
import ChargesTableRow from '../ChargesTableRow';
import './style.css';

function ChargesTable() {
  const [rotateClient, setRotateClient] = useState(false);

  const [rotateID, setRotateID] = useState(false);

  const { charges, setCharges, searchCharges, setSearchCharges, sortOrder, setSortOrder, filteredCharges, setFilteredCharges, filterHomeCharges, setFilterHomeCharges } = useDashboard();

  const [ copyCharges, setCopyCharges] = useState([...charges]);

  const [ copyFilteredCharges, setCopyFilteredCharges] = useState([...filteredCharges]);

  const filtered = searchCharges ? copyCharges.filter((charge) => {
    return charge.client_name.toLowerCase().startsWith(searchCharges.toLowerCase()) || charge.id.toString().startsWith(searchCharges)
  }) : charges;

  const filteredByFilteredCharges = searchCharges ? copyFilteredCharges.filter((charge) => {
    return charge.client_name.toLowerCase().startsWith(searchCharges.toLowerCase()) || charge.id.toString().startsWith(searchCharges)
  }) : filteredCharges

  useEffect(() => {
    return () => {
      setFilterHomeCharges(false);
      setSearchCharges('');
    }
  }, []);

  function handleAlphabeticalOrderClient() {
    setRotateClient(!rotateClient);
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedCharges = [...filtered];
    const sortedChargesFiltered = [...filteredByFilteredCharges]

    if (!filterHomeCharges) {
      sortedCharges.sort((a, b) => {
        const nomeA = a.client_name.toUpperCase();
        const nomeB = b.client_name.toUpperCase();

        if (newSortOrder === 'asc') {
          return nomeA.localeCompare(nomeB);
        } else {
          return nomeB.localeCompare(nomeA);
        }
      });

      if (searchCharges) {
        return setCopyCharges(sortedCharges);
      }

      setCharges(sortedCharges);
    } else {
      sortedChargesFiltered.sort((a, b) => {
        const nomeA = a.client_name.toUpperCase();
        const nomeB = b.client_name.toUpperCase();

        if (newSortOrder === 'asc') {
          return nomeA.localeCompare(nomeB);
        } else {
          return nomeB.localeCompare(nomeA);
        }
      });

      if (searchCharges) {
        return setCopyFilteredCharges(sortedChargesFiltered);
      }

      setFilteredCharges(sortedChargesFiltered);
    }

  }

  function handleAlphabeticalOrderID() {
    setRotateID(!rotateID);
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedCharges = [...filtered];
    const sortedChargesFiltered = [...filteredByFilteredCharges]

    if (!filterHomeCharges) {
      sortedCharges.sort((a, b) => {
        if (newSortOrder === 'asc') {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });

      if (searchCharges) {
        return setCopyCharges(sortedCharges)
      }

      setCharges(sortedCharges);
    } else {
      sortedChargesFiltered.sort((a, b) => {
        if (newSortOrder === 'asc') {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });

      if (searchCharges) {
        return setCopyFilteredCharges(sortedChargesFiltered);
      }

      setFilteredCharges(sortedChargesFiltered);
    }

  }

  function handleSearch(event) {
    const searchCharacter = event.target.value;
    setSearchCharges(searchCharacter);

    if (!searchCharges) {
      setCopyCharges([...charges]);
      setCopyFilteredCharges([...filteredCharges]);
    }
  }

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
              name="searchCharges"
              id=""
              placeholder='Pesquisa'
              onChange={handleSearch}
              value={searchCharges}
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
                  onClick={handleAlphabeticalOrderClient}
                  className={`${rotateClient ? 'rotate' : 'rotate-reverse'}`}
                />
                <span>Cliente</span>
              </th>
              <th>
                <img
                  src={changeOrder}
                  alt="change order"
                  onClick={handleAlphabeticalOrderID}
                  className={`${rotateID ? 'rotate' : 'rotate-reverse'}`}
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
            {!filterHomeCharges
              ?
              !!filtered.length &&
              filtered.map((charge) => (
                <ChargesTableRow key={charge.id} charge={charge} />
              ))
              :
              filteredByFilteredCharges.map((charge) => (
                <ChargesTableRow key={charge.id} charge={charge} />
              ))
            }
          </tbody>
        </table>
        {!filtered.length &&
          <div className='not-results'>
            <img src={notResults} alt="not results" />
          </div>}
      </div>
    </div>
  )
}

export default ChargesTable;