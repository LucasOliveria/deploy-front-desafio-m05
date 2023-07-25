import axios from "axios";

// export async function getZipCode(data) {
//   return axios.get(`viacep.com.br/ws/${data}/json/`);
// }

export const getZipCode = axios.create({
  baseURL: 'viacep.com.br/ws',
  timeout: 10000,
  headers: { 'Content-type': 'Application/json' }
});
