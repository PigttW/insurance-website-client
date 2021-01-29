import {CHECK_LOGIN, CURRENT_DETAIL, LOGIN, LOGOUT} from "../actions/auth.action";

export default function authReducer(oldState = null, action) {
    let res;
    switch (action.type) {
        case LOGIN:
            res = action.payload.data;
            if (res.success) {
                return res.user;
            } else {
                return null;
            }
        case CHECK_LOGIN:
            res = action.payload.data;
            if (res.success) {
                return res.user;
            } else {
                return null;
            }
        case LOGOUT:
            res = action.payload.data;
            if (res.success) {
                return null;
            } else {
                return oldState;
            }
        default:
            return oldState;
    }
}
