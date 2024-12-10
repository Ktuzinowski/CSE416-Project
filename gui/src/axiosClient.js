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
    Precincts: "precincts",
    SMD_BOX_AND_WHISKER: "box_and_whisker/smd",
    MMD_BOX_AND_WHISKER: "box_and_whisker/mmd"
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

export const getCurrentDistrictPlans = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.Current_District_Plans, {state: state});
        return data;
    } catch (error) {
        console.error(`Failed to fetch current district plans for state ${state}:`, error.message);
        throw error;
    }
}

export const getPrecincts = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.Precincts, {state: state});
        return data;
    } catch (error) {
        console.error(`Failed to fetch precincts for state ${state}:`, error.message);
        throw error;
    }
}

export const getSmdBoxAndWhiskerPlotData = async (state, boc) => {
    try {
        const data = await makeRequest(REQUESTS.SMD_BOX_AND_WHISKER, {state: state, boc: boc});
        return data;
    } catch (error) {
        console.error(`Failed to fetch smd box and whisker data for state ${state} with boc ${boc}:`, error.message);
        throw error;
    }
}

export const getMmdBoxAndWhiskerPlotData = async (state, boc) => {
    try {
        const data = await makeRequest(REQUESTS.MMD_BOX_AND_WHISKER, {state: state, boc: boc});
        return data;
    } catch (error) {
        console.error(`Failed to fetch mmd box and whisker data for state ${state} with boc ${boc}:`, error.message);
        throw error;
    }
}