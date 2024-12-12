import axios from "axios";

// Create an Axios instance with a base URL
const axiosClient = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for Spring Boot server
    headers: {
        "Content-Type": "application/json",
    },
});

const REQUESTS = {
    STATES_AVAILABLE: "states_available",
    STATE_OUTLINES: "state_outlines",
    CURRENT_DISTRICT_PLANS: "current_district_plans",
    PRECINCTS: "precincts",
    SMD_BOX_AND_WHISKER: "box_and_whisker/smd",
    MMD_BOX_AND_WHISKER: "box_and_whisker/mmd",
    SMD_ENSEMBLE_SUMMARY: "ensemble/summary/smd",
    MMD_ENSEMBLE_SUMMARY: "ensemble/summary/mmd",
    SMD_DISTRICT_PLAN: "smd_district_plans",
    SMD_DISTRICT_PLANS_SUMMARY: "smd_district_plans/summary"
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
        const data = await makeRequest(REQUESTS.STATE_OUTLINES);
        return data;
    } catch (error) {
        console.error("Failed to fetch state outlines:", error.message);
        throw error;
    }
}

export const getStatesAvailable = async () => {
    try {
        const data = await makeRequest(REQUESTS.STATES_AVAILABLE);
        return data.map((stateDocument) => stateDocument.state);
    } catch (error) {
        console.error("Failed to fetch states available:", error.message);
        throw error;
    }
}

export const getCurrentDistrictPlans = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.CURRENT_DISTRICT_PLANS, {state: state});
        return data;
    } catch (error) {
        console.error(`Failed to fetch current district plans for state ${state}:`, error.message);
        throw error;
    }
}

export const getPrecincts = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.PRECINCTS, {state: state});
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

export const getSmdEnsembleSummaryData = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.SMD_ENSEMBLE_SUMMARY, {state: state});
        return data;
    } catch (error) {
        console.error(`Failed to fetch smd summary data for state ${state}:`, error.message);
        throw error;
    }
}

export const getMmdEnsembleSummaryData = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.MMD_ENSEMBLE_SUMMARY, {state: state});
        return data;
    } catch (error) {
        console.error(`Failed to fetch mmd summary data for state ${state}:`, error.message);
        throw error;
    }
}

export const getSmdDistrictPlan = async (name) => {
    try {
        const data = await makeRequest(REQUESTS.SMD_DISTRICT_PLAN, {name: name});
        return data;
    } catch (error) {
        console.error(`Failed to fetch smd district plan for name ${name}:`, error.message);
        throw error;
    }
}

export const getSmdDistrictPlansSummaries = async (state) => {
    try {
        const data = await makeRequest(REQUESTS.SMD_DISTRICT_PLANS_SUMMARY, {state: state});
        return data;
    } catch (error) {
        console.error(`Failed to fetch smd district plan summaries for state ${state}:`, error.message);
        throw error;
    }
}