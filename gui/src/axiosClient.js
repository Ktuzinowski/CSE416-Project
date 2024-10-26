import axios from "axios";

// Create an Axios instance with a base URL
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for Spring Boot server
    headers: {
        "Content-Type": "application/json",
    },
});

const REQUESTS = {
    States_Available: "states_available",
    State_Outlines: "state_outlines",
    Current_District_Plans: "current_district_plans",
    Precincts: "precincts"
}

const makeRequest = async (requestType, params = {}, config = {}) => {
    try {
        const response = await axiosClient.get(`/${requestType}`, {
            params, // Query parameters
            ...config, // Additional Axios config (e.g., headers)
        });
        return response.data;
    } catch (error) {
        console.error("Request failed:", error.response?.data || error.message);
        throw error;
    }
}

export const getStateOutlines = async () => {
    try {
        const data = await makeRequest(REQUESTS.State_Outlines);
        return data;
    } catch (error) {
        console.error("Failed to fetch state outlines:", error.message);
        throw error;
    }
}

export const getStatesAvailable = async () => {
    try {
        const data = await makeRequest(REQUESTS.States_Available);
        return data.map((stateDocument) => stateDocument.state);
    } catch (error) {
        console.error("Failed to fetch states available:", error.message);
        throw error;
    }
}

