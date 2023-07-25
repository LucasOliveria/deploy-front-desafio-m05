import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import useDashboard from '../../hooks/useDashboard';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import './style.css';

function Dashboard({ children }) {
  const { setUser, setClients } = useDashboard();

  const token = getItem("token");

  async function getUser() {
    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function getClients() {
    try {

      const response = await api.get("/client", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients([...response.data]);
    } catch (error) {
      return toast.error(error.response.data);
    }
  }

  useEffect(() => {
    getUser();
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
