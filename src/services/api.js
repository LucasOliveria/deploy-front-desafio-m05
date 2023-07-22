import axios from "axios";

export const api = axios.create({
  baseURL: 'localhost:3000',
  timeout: 10000,
  headers: { 'Content-type': 'Application/json' }
});

