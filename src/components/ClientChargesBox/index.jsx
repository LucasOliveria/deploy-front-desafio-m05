import { useState } from "react";
import changeOrder from "../../assets/change-order.svg";
import useDashboard from "../../hooks/useDashboard";
import ChargesTableRow from "../ChargesTableRow";
import './style.css';

function ClientChargesBox() {
  const { clientDetails, setClientDetails, handleNewChargeModalOpen, sortOrder, setSortOrder } = useDashboard();
  const [rotateID, setRotateID] = useState(false);
  const [rotateDate, setRotateDate] = useState(false);
  const { client, charges } = clientDetails;


  const handleModalOpen = () => {
    handleNewChargeModalOpen(client)
  };

  function handleOrderId() {

    setRotateID(!rotateID);
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedCharges = [...charges];
    sortedCharges.sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setClientDetails({ client, charges: [...sortedCharges] })
  }

  function handleOrderDate() {

    setRotateDate(!rotateDate);
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedCharges = [...charges];

    sortedCharges.sort((a, b) => {
      if (newSortOrder === 'asc') {
        return new Date(a.due_date) - new Date(b.due_date);
      } else {
        return new Date(b.due_date) - new Date(a.due_date);
      }
    });
    setClientDetails({ client, charges: [...sortedCharges] })
  }

  return (
    <div className="container-client-charges fade-in">
      <div className='title-client-charges'>
        <h3>Cobranças do cliente</h3>
        <button onClick={handleModalOpen}>
          + Nova cobrança
        </button>
      </div>
      <div className="content-table-client-charges">
        <table className="table-client-charges">
          <thead>
            <tr>
              <th>
                <img
                  onClick={handleOrderId}
                  className={`${rotateID ? 'rotate' : 'rotate-reverse'}`}
                  src={changeOrder}
                  alt="change order" />
                <span>ID Cob.</span>
              </th>
              <th>
                Valor
              </th>
              <th>
                <img
                  onClick={handleOrderDate}
                  className={`${rotateDate ? 'rotate' : 'rotate-reverse'}`}
                  src={changeOrder}
                  alt="change order" />
                <span> Data de venc.</span>
              </th>
              <th>
                Status
              </th>
              <th>
                Descrição
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!!charges?.length &&
              charges.map((charge) => (
                <ChargesTableRow key={charge.id} charge={{ client_name: client.name, ...charge }} renderClientName={false} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default ClientChargesBox;