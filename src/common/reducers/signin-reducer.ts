import { SIGNEDIN } from "./types";

const initState = {
    publicKey: null,
    accountHash: null,
    did: null
}

export const signinReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNEDIN:
            return {
                ...state,
                ...action.payload
            };       
        default:
            return { ...state };
    }
}
