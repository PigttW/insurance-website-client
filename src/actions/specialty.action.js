import axios from "axios";

export const GET_SPECIALTY = "GET_SPECIALTY";

const API_URL = process.env.REACT_APP_API_URL;

export function getSpecialty() {
    const promise = axios.get(`http://localhost:8080/specialty`);
    return {
        type: GET_SPECIALTY,
        payload: promise
    }
}
