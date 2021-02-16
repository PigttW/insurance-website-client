import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";

const API_URL = process.env.REACT_APP_API_URL;

export function getComments() {
    const promise = axios.get('http://localhost:8080/comments');
    return {
        type: GET_COMMENTS,
        payload: promise
    }
}

export function addComment(comment) {
    const promise = axios.post('http://localhost:8080/comments', comment);
    return {
        type: ADD_COMMENT,
        payload: promise
    }
}
