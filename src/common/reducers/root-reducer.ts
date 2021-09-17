import { combineReducers } from "redux";
import { signinReducer } from "./signin-reducer";

export const rootReducer = combineReducers({
    signin: signinReducer
})
