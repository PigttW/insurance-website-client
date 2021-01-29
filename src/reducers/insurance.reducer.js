import {GET_INSURANCES, SORT_INSURANCES} from "../actions/insurances.action";

export default function insurancesReducer(oldState = null, action) {
    switch (action.type) {
        case GET_INSURANCES:
            return action.payload.data;

        case SORT_INSURANCES:
            switch (action.payload) {
                case "rate":
                    oldState.sort((a, b) => a.monthlyRate - b.monthlyRate);
                    break;
                case "deductible":
                    oldState.sort((a, b) => a.deductible - b.deductible);
                    break;
                case "maximum":
                    oldState.sort((a, b) => a.outOfPocketMaximum - b.outOfPocketMaximum);
                    break;
            }
            console.log(oldState);
            return oldState;
        default:
            return oldState;
    }
}
