import ExpiredChargesImage from '../../assets/expiredCharges.svg';
import FutureChargesImage from '../../assets/futureCharges.svg';
import PaidChargesImage from '../../assets/paidCharges.svg';
import OkClient from '../../assets/ok-client.svg';
import DebtorClient from '../../assets/debtor-client.svg';
import ChargesCard from '../ChargesCard';
import ChargesResume from '../ChargesResume';
import ClientsCard from '../ClientsCard';
import './style.css';

function Home() {
  return (
    <div className='HomeComponent'>
      <div className='cards-wrapper'>
        <ChargesResume
          imageSrc={PaidChargesImage}
          title={'Cobranças Pagas'}
          value={30000}
          backgroundColor={'var(--low-opacity-blue-n1)'}

        />
        <ChargesResume
          imageSrc={ExpiredChargesImage}
          title={'Cobranças vencidas'}
          value={7000}
          backgroundColor={'var(--low-opacity-red-n1)'}
        />
        <ChargesResume
          imageSrc={FutureChargesImage}
          title={'Cobranças Previstas'}
          value={10000}
          backgroundColor={'var(--low-opacity-yellow-n1)'}
        />
      </div>
      <div className='cards-wrapper'>
        <ChargesCard
          backgroundColor={'var(--low-opacity-red-n1)'}
          textColor={'var(--red-n1)'}
          title={'Cobranças Vencidas'}
          total={'08'}
        />
        <ChargesCard
          backgroundColor={'var(--low-opacity-yellow-n1)'}
          textColor={'var(--yellow-n1)'}
          title={'Cobranças previstas'}
          total={'05'}
        />
        <ChargesCard
          backgroundColor={'var(--low-opacity-blue-n1)'}
          textColor={'var(--blue-n1)'}
          title={'Cobranças Pagas'}
          total={'10'}
        />
      </div>
      <div className='cards-wrapper'>
        <ClientsCard
          icon={DebtorClient}
          title={'Clientes Inadimplentes'}
          total={'08'}
          textColor={'var(--red-n1)'}
          backgroundColor={'var(--low-opacity-red-n1)'} />
        <ClientsCard
          icon={OkClient}
          title={'Clientes em dia'}
          total={'08'}
          textColor={'var(--blue-n1)'}
          backgroundColor={'var(--low-opacity-blue-n1)'} />
      </div>
    </div>
  )
}

export default Home;
