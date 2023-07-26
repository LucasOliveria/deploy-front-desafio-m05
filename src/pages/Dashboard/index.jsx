import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import useDashboard from '../../hooks/useDashboard';
import api from '../../services/api';
import { headers } from '../../utils/headers';
import { clearStorage } from '../../utils/storage';
import './style.css';

function Dashboard({ children }) {
  const { setUser, setClients } = useDashboard();

  const navigateTo = useNavigate()

  async function getUser() {
    try {
      const { data } = await api.get("/user", {
        headers: headers()
      })
      setUser(data);
    } catch (error) {
      toast.error(error.response.data);
      clearStorage()
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
  useEffect(() => {
    getUser()
    getClients();
  }, []);

  return (
    <div className='Dashboard'>
      <aside>
        <Sidebar />
      </aside>
      <main className='main-content'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default Dashboard;
