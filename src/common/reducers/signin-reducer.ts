import { SIGNIN } from "./types"

const initState = {
    publicKey: null,
    accountHash: null
}

export const signinReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                ...action.payload
            };
        default:
            return { ...state };
    }
}
