import axios from "axios";

export async function fetchPrepStates() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/prep_state`);

    const states = response.data.data.states.map((state) => ({
        ...state,
        state_name: state.name,
        state_code: state.code
    }));

    // Sort alphabetically by state_name
    const sortedStates = states.sort((a, b) =>
        a.state_name.localeCompare(b.state_name)
    );

    return sortedStates;
}
