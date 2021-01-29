import axios from "axios";

export const GET_PROVIDERS = 'GET_PROVIDERS';
export const FILTER_PROVIDERS_BY_TYPE = 'FILTER_PROVIDERS_BY_TYPE';
export const FILTER_PROVIDERS_BY_NAME = 'FILTER_PROVIDERS_BY_NAME';

export function getProviders() {
    const promise = axios.get('http://localhost:8080/provider-detail');
    return {
        type: GET_PROVIDERS,
        payload: promise
    }
}

export function filterProvidersByType(type) {
    return {
        type: FILTER_PROVIDERS_BY_TYPE,
        payload: type
    }
}

export function filterProvidersByName(name) {
    return {
        type: FILTER_PROVIDERS_BY_NAME,
        payload: name
    }
}
