import {SIGNUP} from "../actions/user.action";

export default function userReducer(oldState = false, action) {
    switch (action.type) {
        case SIGNUP:
            return action.payload.data;

        default:
            return oldState;
    }
}
