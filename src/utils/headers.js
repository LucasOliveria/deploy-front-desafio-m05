import { getItem } from "./storage"

export const headers = () => {
  const token = getItem('token')
  return { Authorization: `Bearer ${token}` }
}