import { VP_HOLDER } from "./types";

const initState = {
    list: []
};

export function vpHolderReducer(state = initState, action): any {
    switch (action.type) {
        case VP_HOLDER:
            return {
                ...state,
                list: [...action.payload]
            };       
        default:
            return { ...state };
    }
}