import axios from "axios";

const apiUri = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUri + 'api',
});

export default api
