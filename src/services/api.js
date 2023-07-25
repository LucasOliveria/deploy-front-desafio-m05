import axios from "axios";

export default axios.create({
  baseURL: 'https://backend-equipe6.cyclic.app',
  timeout: 10000,
  headers: { 'Content-type': 'Application/json' }
});

