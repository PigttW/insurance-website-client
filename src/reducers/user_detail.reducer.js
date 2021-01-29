import {CURRENT_DETAIL, UPDATE_DETAIL} from "../actions/user_detail.action";

export default function userDetailReducer(oldState = null, action) {
    let response;
    switch(action.type) {
        case CURRENT_DETAIL:
            return action.payload.data;
        case UPDATE_DETAIL:
            response = action.payload.data;
            console.log(response);
            if (response.success) {
                const updatedDetail = response.product;
                console.log(updatedDetail);
                const index = oldState.findIndex(d => d.id === updatedDetail.id);
                oldState.splice(index, 1, updatedDetail);
            } else {
                return oldState;
            }
        default:
            return oldState;
    }
}
