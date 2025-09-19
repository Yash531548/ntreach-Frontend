import axios from "axios";

export async function fetchStates() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/get_state`);
    return response.data.states;
}