import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchPastConsultations = async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(
        `${BASE_URL}api/user/get_book_teleconsultation`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    // API data mapping below
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    }
    return [];
};