import { combineReducers } from "redux";
import { signinReducer } from "./signin-reducer";
import {verifierReducer} from "./verifier-reducer";

export const rootReducer = combineReducers({
    signin: signinReducer,
    verefier: verifierReducer
})
