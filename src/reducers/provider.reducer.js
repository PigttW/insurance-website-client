import {FILTER_PROVIDERS_BY_NAME, FILTER_PROVIDERS_BY_TYPE, GET_PROVIDERS} from "../actions/providers.action";

export default function providerReducer(oldState = null, action) {
    switch (action.type) {
        case GET_PROVIDERS:
            return action.payload.data;
        case FILTER_PROVIDERS_BY_TYPE:
            let type = action.payload;
            if (type === "NULL") {
                return oldState;
            }
            return oldState.filter(x => x.specialty.type === type);
        case FILTER_PROVIDERS_BY_NAME:
            let name = action.payload;
            if (name === "NULL") {
                return oldState;
            }

            return oldState.filter(x => {
                return x.firstName.toLowerCase().indexOf(name.toLowerCase()) >= 0
                    || x.lastName.toLowerCase().indexOf(name.toLowerCase()) >= 0;
            });
        default:
            return oldState;
    }
}
