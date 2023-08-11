import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import clientIconTable from "../../assets/client-icon-table.svg";
import useDashboard from "../../hooks/useDashboard";
import api from '../../services/api';
import { headers } from '../../utils/headers';
import ClientChargesBox from "../ClientChargesBox";
import ClientDetailsBox from '../ClientDetailsBox';
import './style.css';

function ClientDetails() {
  const { clientDetails, setClientDetails } = useDashboard();

  const navigate = useNavigate();

  const { id } = useParams();

  async function getClientDetails(id) {
    try {
      const response = await api.get(`/client/charge/${id}`, {
        headers: headers()
      });

      setClientDetails(response.data);
    } catch (error) {
      toast.error("Cliente não encontrado");

      navigate("/dashboard/clientes");
    }
  }

  useEffect(() => {
    getClientDetails(id);
  }, []);

  return (
    <div className='container-client-details'>
      <div className="icon-and-title">
        <img src={clientIconTable} alt="client icon" />
        <h2 className="name-client-details">{clientDetails.client?.name}</h2>
      </div>
      <ClientDetailsBox />

      <ClientChargesBox />
    </div>
  )
}

export default ClientDetails;
