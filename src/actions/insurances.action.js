import axios from "axios";

export const GET_INSURANCES = "GET_INSURANCES"
export const SORT_INSURANCES = "SORT_INSURANCES"

export function getInsurances() {
    const promise = axios.get('http://localhost:8080/insurance');
    return {
        type: GET_INSURANCES,
        payload: promise
    };
}

export function sortInsurances(type) {
    return {
        type: SORT_INSURANCES,
        payload: type
    }
}
