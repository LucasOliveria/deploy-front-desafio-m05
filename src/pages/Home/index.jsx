import ClientsTable from '../../components/ClientsTable';
import Header from '../../components/HomeComponents/Header';
import Sidebar from '../../components/HomeComponents/Sidebar';
import './style.css';

function Home() {
  return (
    <div className='Home'>
      <aside>
        <Sidebar />
      </aside>
      <main className='main-content'>
        <Header />

        <div className='cards-wrapper'>
          {/* <div className='cards total-cards'>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </div>
          <div className='cards chards-cards'>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </div>
          <div className='cards clients-cards'>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </div> */}
          <ClientsTable />
        </div>


      </main>
    </div>
  )
}

export default Home;
