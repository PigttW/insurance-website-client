import {
    FILTER_PROVIDERS_BY_NAME,
    FILTER_PROVIDERS_BY_TYPE,
    GET_PROVIDERS,
    UPDATE_PROVIDER_DETAIL
} from "../actions/providers.action";

export default function providerReducer(oldState = null, action) {
    let response;
    switch (action.type) {
        case GET_PROVIDERS:
            return action.payload.data;
        case FILTER_PROVIDERS_BY_TYPE:
            let type = action.payload;
            if (type === "NULL") {
                return oldState;
            }
            return oldState.filter(x => x.specialty !== null).filter(x => x.specialty.type === type);
        case FILTER_PROVIDERS_BY_NAME:
            let name = action.payload;
            if (name === "NULL") {
                return oldState;
            }

            return oldState.filter(x => x.specialty !== null).filter(x => {
                return x.firstName.toLowerCase().indexOf(name.toLowerCase()) >= 0
                    || x.lastName.toLowerCase().indexOf(name.toLowerCase()) >= 0;
            });

        case UPDATE_PROVIDER_DETAIL:
            response = action.payload.data;
            if (response.success) {
                const updatedDetail = response.providerDetail;
                const index = oldState.findIndex(d => d.id === updatedDetail.id);
                oldState.splice(index, 1, updatedDetail);
                return oldState;
            }

        default:
            return oldState;
    }
}
