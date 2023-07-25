import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ClientsTable from "./components/ClientsTable";
import Home from "./components/Home";
import dashboardContext from "./contexts/dashboardContext";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import { getItem } from "./utils/storage";

function ProtectedRouter({ redirectTo }) {
  const Authenticated = getItem('token');
  return Authenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRouter redirectTo={"/"} />}>
        <Route path="/dashboard/home" element={
          <Dashboard>
            <Home />
          </Dashboard>} />
        <Route path="/dashboard/clientes" element={
          <Dashboard>
            <ClientsTable />
          </Dashboard>
        } />
        <Route path="/dashboard/cobrancas" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default MainRouter;
