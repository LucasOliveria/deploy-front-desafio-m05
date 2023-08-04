import { createContext, useState } from "react";

export const dashboardContext = createContext({});

function DashboardContextProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    cpf: "",
    phone: ""
  });

  const [openEditUser, setOpenEditUser] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
    confirmNewPassword: '',
  });

  const [clients, setClients] = useState([]);
  const [charges, setCharges] = useState([]);
  const [chargesSummary, setChargesSummary] = useState({});
  const [clientDetails, setClientDetails] = useState({});

  const [openNewChargeModal, setOpenNewChargeModal] = useState(false);
  const [newChargeClient, setNewChargeClient] = useState({ id: '', name: '' });
  const [editingCharge, setEditingCharge] = useState({ description: '', due_date: '', value: '', status: 'pago' });
  const [isEditingCharge, setIsEditingCharge] = useState(false);

  const [homeModifier, setHomeModifier] = useState({});

  function handleNewChargeModalOpen(client, editing = false) {
    if (editing) {
      setIsEditingCharge(true)
    }
    setNewChargeClient(client)
    setOpenNewChargeModal(true)
  }

  function handleNewChargeModalClose() {
    setOpenNewChargeModal(false)
    setIsEditingCharge(false)
    setEditingCharge({ description: '', due_date: '', value: '', status: 'pago' })
  }

  return (
    <dashboardContext.Provider value={{
      user,
      setUser,
      clients,
      setClients,
      openEditUser,
      setOpenEditUser,
      formData,
      setFormData,
      chargesSummary,
      setChargesSummary,
      clientDetails,
      setClientDetails,
      charges,
      setCharges,
      openNewChargeModal,
      handleNewChargeModalOpen,
      handleNewChargeModalClose,
      newChargeClient,
      editingCharge,
      setEditingCharge,
      isEditingCharge,
      setIsEditingCharge,
      homeModifier,
      setHomeModifier
    }}>
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContextProvider;