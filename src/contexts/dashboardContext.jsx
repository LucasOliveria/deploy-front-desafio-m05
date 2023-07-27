import { createContext } from "react";
import { useState } from "react";

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

  return (
    <dashboardContext.Provider value={{
      user,
      setUser,
      clients,
      setClients,
      openEditUser,
      setOpenEditUser,
      formData,
      setFormData
    }}>
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContextProvider;