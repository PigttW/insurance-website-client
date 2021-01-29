import {combineReducers} from "redux";
import authReducer from "./auth.reducer";
import insurancesReducer from "./insurance.reducer";
import userDetailReducer from "./user_detail.reducer";
import providerReducer from "./provider.reducer";
import userReducer from "./user.reducer";
import {reducer as FormReducer} from 'redux-form';
import specialtyReducer from "./specialty.reducer";

const rootReducer = combineReducers({
    loggedIn: authReducer,
    form: FormReducer,
    insurances: insurancesReducer,
    userDetail: userDetailReducer,
    providers: providerReducer,
    user: userReducer,
    specialties: specialtyReducer
})

export default rootReducer;
