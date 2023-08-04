import changeOrder from "../../assets/change-order.svg";
import useDashboard from "../../hooks/useDashboard";
import ChargesTableRow from "../ChargesTableRow";
import './style.css';

function ClientChargesBox() {
  const { clientDetails, handleNewChargeModalOpen } = useDashboard();

  const { client, charges } = clientDetails;

  const handleModalOpen = () => {
    handleNewChargeModalOpen(client)
  };

  return (
    <div className="container-client-charges">
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
                <img src={changeOrder} alt="change order" />
                <span>ID Cob.</span>
              </th>
              <th>
                Valor
              </th>
              <th>
                <img src={changeOrder} alt="change order" />
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