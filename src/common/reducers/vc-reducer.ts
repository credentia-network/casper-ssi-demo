import { VC_LIST } from "./types";

const initState = {
    list: []
};

export function vcReducer(state = initState, action): any {
    switch (action.type) {
        case VC_LIST:
            return {
                ...state,
                list: [...action.payload]
            };       
        default:
            return { ...state };
    }
}
