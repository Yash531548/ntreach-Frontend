import axios from "axios";
import { getProviderUser } from "../Context/AuthProviderUserContext";

const apiUri = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUri + 'api',
});

api.interceptors.request.use(config => {
  const user = getProviderUser();

  if (user.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }

  return config
}, error => {
  return Promise.reject(error);
});

export default api
