
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchServiceTypes = async () => {
    const response = await axios.get(`${BASE_URL}api/get_service_type`);
    if (response.data.status === "success") {
        return response.data.data;
    }
    return [];
};
