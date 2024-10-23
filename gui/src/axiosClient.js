import axios from "axios";

// Create an Axios instance with a base URL
export const axiosClient = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for Spring Boot server
    headers: {
        "Content-Type": "application/json",
    },
});

export const REQUESTS = {
    State_Outlines: "state_outlines"
}