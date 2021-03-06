import axios from "axios";

export const SIGNUP = "SIGNUP";

const API_URL = process.env.REACT_APP_API_URL;

export function signup(newUser, callback) {
    const promise = axios.post(`http://localhost:8080/users`, newUser)
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: SIGNUP,
        payload: promise
    };
}

export function providerSignup(newUser, callback) {
    const promise = axios.post('http://localhost:8080/users/provider', newUser)
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: SIGNUP,
        payload: promise
    };
}
