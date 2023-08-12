import { toast } from "react-toastify";
import failureIcon from "../../assets/failure-icon.svg";
import closeIcon from "../../assets/icon-close.svg";
import successIcon from "../../assets/iconsucces.svg";
import warningIcon from "../../assets/warning-icon.svg";
import useDashboard from "../../hooks/useDashboard";
import api from "../../services/api";
import { headers } from "../../utils/headers";
import './style.css';

function ModalDeleteCharge() {
  const { 
    setOpenDeleteCharge, 
    chargeToDelete, 
    charges, 
    setCharges, 
    setHomeModifier, 
    clientDetails, 
    setClientDetails,
    filteredCharges,
    setFilteredCharges,
    setSearchCharges
  } = useDashboard();

  async function handleDeleteCharge() {

    if (chargeToDelete.up_to_date !== "Pendente") {
      setOpenDeleteCharge(false);

      return toast.info("Esta cobrança não pode ser excluída!", {
        position: "bottom-right",
        icon: ({ theme, type }) => <img src={failureIcon} />
      });
    }

    const id = toast.loading("Por favor, aguarde...");

    try {
      await api.delete(`/charge/${chargeToDelete.id}`, {
        headers: headers()
      })

      const allLocalCharges = [...charges];
      const deletedChargeIndex = allLocalCharges.findIndex((charge) => charge.id === chargeToDelete.id);
      allLocalCharges.splice(deletedChargeIndex, 1);

      setCharges(allLocalCharges);

      if (clientDetails?.charges) {
        const localChargesClientDetails = [...clientDetails.charges];
        const deletedChargeClientDetailsIndex = localChargesClientDetails.findIndex((charge) => charge.id === chargeToDelete.id);
        localChargesClientDetails.splice(deletedChargeClientDetailsIndex, 1);
  
        setClientDetails({ ...clientDetails, charges: [ ...localChargesClientDetails ] });
      }

      const localFilteredCharges = [...filteredCharges];
      const deletedFilteredChargeIndex = localFilteredCharges.findIndex((charge) => charge.id === chargeToDelete.id);
      localFilteredCharges.splice(deletedFilteredChargeIndex, 1);
      
      setFilteredCharges(localFilteredCharges);

      setSearchCharges('');

      setHomeModifier(clientDetails);

      toast.update(id, { render: "Cobrança excluída com sucesso!", type: "success", isLoading: false, autoClose: 1500, position: "bottom-right", icon: ({ theme, type }) => <img src={successIcon} /> });
  
      setOpenDeleteCharge(false);
    } catch (error) {
      toast.update(id, { render: error.response.data, type: "error", isLoading: false, autoClose: 1500, position: "bottom-right", icon: ({ theme, type }) => <img src={failureIcon} /> });

      setOpenDeleteCharge(false);
    }
  }

  return (
    <div className='container-modal-delete'>
      <div className='box-modal-delete'>
        <img src={closeIcon} alt="Fechar" onClick={() => setOpenDeleteCharge(false)} />
        <img src={warningIcon} alt="cuidado" />
        <h3>Tem certeza que deseja excluir esta cobrança?</h3>
        <div className='answer-buttons'>
          <button className='no-button' onClick={() => setOpenDeleteCharge(false)}>Não</button>
          <button className='yes-button' onClick={handleDeleteCharge}>Sim</button>
        </div>
      </div>
    </div>
  )
}

export default ModalDeleteCharge;
