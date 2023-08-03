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
      setCharges
    }}>
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContextProvider;