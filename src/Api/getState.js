import axios from "axios";

export async function fetchStates() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/get_state`);
    // Sort alphabetically by state_name
    const sortedStates = response.data.states.sort((a, b) =>
        a.state_name.localeCompare(b.state_name)
    );
    return sortedStates;
}