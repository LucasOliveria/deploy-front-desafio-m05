import axios from "axios";

export const getZipCode = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  timeout: 10000,
  headers: { 'Content-type': 'Application/json' }
});
