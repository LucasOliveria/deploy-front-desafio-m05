import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChargeDetailModal from '../../components/ChargeDetailModal';
import ClientsEditModal from '../../components/ClientsEditModal';
import EditUser from '../../components/EditUser';
import Header from '../../components/Header';
import ModalDeleteCharge from '../../components/ModalDeleteCharge';
import NewChargeModal from '../../components/NewChargeModal';
import Sidebar from '../../components/Sidebar';
import useDashboard from '../../hooks/useDashboard';
import api from '../../services/api';
import { headers } from '../../utils/headers';
import { clearStorage } from '../../utils/storage';
import './style.css';

function Dashboard({ children }) {
  const {
    setUser,
    setClients,
    openEditUser,
    setChargesSummary,
    setCharges,
    openNewChargeModal,
    homeModifier,
    openDeleteCharge,
    showChargeDetailModal,
    clientsModifier,
    showModalEditClient
  } = useDashboard();

  const navigateTo = useNavigate();

  async function getUser() {
    try {
      const { data } = await api.get("/user", {
        headers: headers()
      });

      setUser(data);
    } catch (error) {
      toast.error(error.response.data);
      clearStorage();
      setTimeout(() => navigateTo('/'), 1000)
    }
  }

  async function getClients() {
    try {
      const { data } = await api.get("/client", {
        headers: headers()
      });

      setClients(data);
    } catch (error) {
      return toast.error(error.response.data);
    }
  }
  async function getCharges() {

    try {
      const { data } = await api.get('/charge', {
        headers: headers()
      });
      setCharges(data);
    } catch (error) {

    }
  }

  async function getChargesSummary() {
    try {
      const { data } = await api.get("/charges/bystatus", {
        headers: headers()
      });

      setChargesSummary(data);
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  useEffect(() => {
    getUser()
    getCharges();
  }, []);

  useEffect(() => {
    getClients();
  }, [clientsModifier]);

  useEffect(() => {
    getChargesSummary();
  }, [homeModifier]);

  return (
    <div className='Dashboard'>
      <aside>
        <Sidebar />
      </aside>
      <main className='main-content'>
        <Header />
        {children}
      </main>
      {openEditUser && <EditUser />}
      {openNewChargeModal && <NewChargeModal />}
      {openDeleteCharge && <ModalDeleteCharge />}
      {showChargeDetailModal && <ChargeDetailModal />}
      {showModalEditClient && <ClientsEditModal />}
    </div>
  )
}

export default Dashboard;
