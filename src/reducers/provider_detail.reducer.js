import {
    CURRENT_PROVIDER_DETAIL,
    UPDATE_CURRENT_PROVIDER_DETAIL,
} from "../actions/provider_detail.action";

export default function providerDetailReducer(oldState = null, action) {
    let response;
    switch(action.type) {
        case CURRENT_PROVIDER_DETAIL:
            return action.payload.data;
        case UPDATE_CURRENT_PROVIDER_DETAIL:
            response = action.payload.data;
            if (response.success) {
                const updatedDetail = response.providerDetail;
                const index = oldState.findIndex(d => d.id === updatedDetail.id);
                oldState.splice(index, 1, updatedDetail);
                return oldState;
            } else {
                return oldState;
            }
        default:
            return oldState;
    }
}
