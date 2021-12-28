import { VP_REQUESTS } from "../reducers/types";

export function vpRequestsAction(list: any[]) {
    return function (dispatch) {
        dispatch({
            type: VP_REQUESTS,
            payload: list
        });
    }
}