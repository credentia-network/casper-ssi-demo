import { combineReducers } from "redux";
import { signinReducer } from "./signin-reducer";
import { vcReducer } from "./vc-reducer";
import { verifierReducer } from "./verifier-reducer";
import { vpHolderReducer } from "./vp-holder-reducer";

export const rootReducer = combineReducers({
    signin: signinReducer,
    verefier: verifierReducer,
    vcList: vcReducer,
    vpHolder: vpHolderReducer
})
