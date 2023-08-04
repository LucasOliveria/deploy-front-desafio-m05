import DebtorClient from '../../assets/debtor-client.svg';
import ExpiredChargesImage from '../../assets/expiredCharges.svg';
import FutureChargesImage from '../../assets/futureCharges.svg';
import OkClient from '../../assets/ok-client.svg';
import PaidChargesImage from '../../assets/paidCharges.svg';
import useDashboard from '../../hooks/useDashboard';
import ChargesCard from '../ChargesCard';
import ChargesResume from '../ChargesResume';
import ClientsCard from '../ClientsCard';
import './style.css';

function Home() {
  const { chargesSummary } = useDashboard();

  return (
    <div className='HomeComponent'>
      <div className='cards-wrapper fade-in'>
        <ChargesResume
          imageSrc={PaidChargesImage}
          title={'Cobranças Pagas'}
          value={chargesSummary.totalChargeAmountPerStatus?.paid_charges || "0"}
          backgroundColor={'var(--low-opacity-blue-n1)'}

        />
        <ChargesResume
          imageSrc={ExpiredChargesImage}
          title={'Cobranças Vencidas'}
          value={chargesSummary.totalChargeAmountPerStatus?.overdue_charges || "0"}
          backgroundColor={'var(--low-opacity-red-n1)'}
        />
        <ChargesResume
          imageSrc={FutureChargesImage}
          title={'Cobranças Previstas'}
          value={chargesSummary.totalChargeAmountPerStatus?.expected_charges || "0"}
          backgroundColor={'var(--low-opacity-yellow-n1)'}
        />
      </div>

      <div className='cards-wrapper fade-in'>
        <ChargesCard
          backgroundColor={'var(--low-opacity-red-n1)'}
          textColor={'var(--red-n1)'}
          title={'Cobranças Vencidas'}
          total={chargesSummary.amountChargesPerStatus?.amountOverdueCharges}
          body={chargesSummary.clients?.clientsOverdueCharges}
        />
        <ChargesCard
          backgroundColor={'var(--low-opacity-yellow-n1)'}
          textColor={'var(--yellow-n1)'}
          title={'Cobranças Previstas'}
          total={chargesSummary.amountChargesPerStatus?.amountExpectedCharges}
          body={chargesSummary.clients?.clientsExpectedCharges}
        />
        <ChargesCard
          backgroundColor={'var(--low-opacity-blue-n1)'}
          textColor={'var(--blue-n1)'}
          title={'Cobranças Pagas'}
          total={chargesSummary.amountChargesPerStatus?.amountPaidCharges}
          body={chargesSummary.clients?.clientsPaidcharges}
        />
      </div>

      <div className='cards-wrapper fade-in'>
        <ClientsCard
          icon={DebtorClient}
          title={'Clientes Inadimplentes'}
          textColor={'var(--red-n1)'}
          backgroundColor={'var(--low-opacity-red-n1)'}
          total={chargesSummary.upToDateAndDefaulterclients?.numberDefaulterClients}
          body={chargesSummary.upToDateAndDefaulterclients?.defaulterClients}
        />
        <ClientsCard
          icon={OkClient}
          title={'Clientes em dia'}
          textColor={'var(--blue-n1)'}
          backgroundColor={'var(--low-opacity-blue-n1)'}
          total={chargesSummary.upToDateAndDefaulterclients?.numberUpToDateClients}
          body={chargesSummary.upToDateAndDefaulterclients?.upToDateClients}
        />
      </div>
    </div>
  )
}

export default Home;
