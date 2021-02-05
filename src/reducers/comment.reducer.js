import {ADD_COMMENT, GET_COMMENTS} from "../actions/comment.action";

export default function commentReducer(oldState = null, action) {

    let response;
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload.data;
        case ADD_COMMENT:
            response = action.payload.data;
            if (response.success) {
                oldState = [...oldState, response.comment];
            }
            return oldState;
        default:
            return oldState;
    }
}
