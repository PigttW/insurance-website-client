import axios from "axios";

export const CURRENT_PROVIDER_DETAIL = 'CURRENT_PROVIDER_DETAIL';
export const UPDATE_CURRENT_PROVIDER_DETAIL = 'UPDATE_CURRENT_PROVIDER_DETAIL';

export function getCurrentProviderDetail(id) {
    const promise = axios.get('http://localhost:8080/provider-detail/' + id);
    return {
        type: CURRENT_PROVIDER_DETAIL,
        payload: promise
    }
}

export function updateCurrentProviderDetail(providerDetail, callback) {
    const promise = axios.put('http://localhost:8080/provider-detail/' + providerDetail.id, providerDetail)
        .then((response) => {
            if (typeof callback === 'function') {
                callback(response);
            }
            return response;
        });
    return {
        type: UPDATE_CURRENT_PROVIDER_DETAIL,
        payload: promise
    }
}
