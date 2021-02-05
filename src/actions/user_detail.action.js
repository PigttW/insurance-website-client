import axios from "axios";

export const CURRENT_DETAIL = 'GET_CURRENT_DETAIL';
export const UPDATE_DETAIL = 'UPDATE_DETAIL';
export const DELETE_PROVIDER = 'DELETE_PROVIDER';

export function getCurrentUserDetail(id) {
    const promise = axios.get('http://localhost:8080/user-detail/' + id);
    return {
        type: CURRENT_DETAIL,
        payload: promise
    }
}

export function updateUserDetail(userDetail, callback) {
    const promise = axios.put('http://localhost:8080/user-detail/' + userDetail.id, userDetail)
        .then((response) => {
            if (typeof callback === 'function') {
                callback(response);
            }
            return response;
        });
    return {
        type: UPDATE_DETAIL,
        payload: promise
    }
}

export async function deleteProviderFromHealthTeam(id, providerDetail) {
    let promise = await axios.delete('http://localhost:8080/user-detail/' + id, {
        data: providerDetail
    });
    return {
        type: DELETE_PROVIDER,
        payload: promise,
        userId: id,
        providerId: providerDetail.id
    }
}
