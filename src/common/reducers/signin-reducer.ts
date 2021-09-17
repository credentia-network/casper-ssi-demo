import { SIGNIN } from "./types"

const initState = {
    accountKey: null
}

export const signinReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGNIN:
            return { ...state, accountKey: action.payload.accountKey };
        default: 
            return { ...state };
    }
}
