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
    
}

