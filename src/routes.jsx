import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";

function ProtectedRouter({ redirectTo }) {
  const Authenticade = true;

  return Authenticade ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRouter redirectTo={"/"} />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default MainRouter;
