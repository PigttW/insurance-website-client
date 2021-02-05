import {CURRENT_DETAIL, DELETE_PROVIDER, UPDATE_DETAIL} from "../actions/user_detail.action";

export default function userDetailReducer(oldState = null, action) {
    let response;
    switch(action.type) {
        case CURRENT_DETAIL:
            return action.payload.data;
        case UPDATE_DETAIL:
            response = action.payload.data;
            if (response.success) {
                const updatedDetail = response.userDetail;
                const index = oldState.findIndex(d => d.id === updatedDetail.id);
                oldState.splice(index, 1, updatedDetail);
                return oldState;
            } else {
                return oldState;
            }
        case DELETE_PROVIDER:
            response = action.payload.data;
            if (response) {
                const index = oldState.myHealthTeam.findIndex(p => p.id === action.providerId);
                oldState.myHealthTeam.splice(index, 1);
            }
            return oldState;
        default:
            return oldState;
    }
}
