import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import EditUser from '../../components/EditUser';
import Sidebar from '../../components/Sidebar';
import useDashboard from '../../hooks/useDashboard';
import api from '../../services/api';
import { headers } from '../../utils/headers';
import { clearStorage } from '../../utils/storage';
import './style.css';
import NewChargeModal from '../../components/NewChargeModal';

function Dashboard({ children }) {
  const { setUser, setClients, openEditUser, setChargesSummary, setCharges, openNewChargeModal, homeModifier } = useDashboard();

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
      setFilteredClients(filtered);
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
    getClients();
    getCharges();
  }, []);

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
    </div>
  )
}

export default Dashboard;