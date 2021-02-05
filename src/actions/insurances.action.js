import axios from "axios";

export const GET_INSURANCES = "GET_INSURANCES"
export const SORT_INSURANCES = "SORT_INSURANCES"
export const ADD_INSURANCE = "ADD_INSURANCE"

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

export function addInsurance(insurance) {
    const promise = axios.post('http://localhost:8080/insurance', insurance);
    return {
        type: ADD_INSURANCE,
        payload: promise
    };
}
