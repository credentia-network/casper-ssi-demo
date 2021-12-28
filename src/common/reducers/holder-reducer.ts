import { HOLDER_REQUESTS, HOLDER_VC } from "./types";

const initState = {
    requests: []
};

export function holderReducer(state = initState, action): any {
    switch (action.type) {
        case HOLDER_REQUESTS:
            return {
                ...state,
                requests: [...action.payload]
            };  
        case HOLDER_VC:
            return {
                ...state,
                vcs: [...action.payload]
            };  
        default:
            return { ...state };
    }
}