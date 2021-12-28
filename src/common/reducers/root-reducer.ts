import { combineReducers } from "redux";
import { holderReducer } from "./holder-reducer";
import { signinReducer } from "./signin-reducer";
import { vcReducer } from "./vc-reducer";
import { verifierReducer } from "./verifier-reducer";
import { vpRequestsReducer } from "./vp-requests-reducer";

export const rootReducer = combineReducers({
    signin: signinReducer,
    verefier: verifierReducer,
    vcList: vcReducer,
    vpRequest: vpRequestsReducer,
    holder: holderReducer
})
