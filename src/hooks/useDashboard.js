import { useContext } from "react";
import { dashboardContext } from "../contexts/dashboardContext";

function useDashboard() {
  return useContext(dashboardContext);
}

export default useDashboard;