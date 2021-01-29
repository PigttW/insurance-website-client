import {GET_SPECIALTY} from "../actions/specialty.action";

export default function specialtyReducer(oldState = null, action) {
    switch (action.type) {
        case GET_SPECIALTY:
            return action.payload.data;
        default:
            return oldState;
    }
}
