import { HOLDER_REQUESTS, HOLDER_VC, STATUS_VP_REQUEST } from "./types";

const initState = {
    requests: [],
    vcs: []
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
        case STATUS_VP_REQUEST: {
            return {
                vcs: state.vcs,
                requests: action.payload
            };
        }
        default:
            return { ...state };
    }
}