import { VP_REQUESTS } from "./types";

const initState = {
    list: []
};

export function vpRequestsReducer(state = initState, action): any {
    switch (action.type) {
        case VP_REQUESTS:
            return {
                ...state,
                list: [...action.payload]
            };        
        // case CREATE_VP_REQUEST:
        //     return { ...state };
        default:
            return { ...state };
    }
}