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

  const [clients, setClients] = useState([]);

  return (
    <dashboardContext.Provider value={{
      user,
      setUser,
      clients,
      setClients
    }}>
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContextProvider;