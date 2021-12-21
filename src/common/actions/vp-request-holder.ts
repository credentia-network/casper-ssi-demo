import { VP_HOLDER } from "../reducers/types";

export function vpRequestHolderAction(list: any[]) {
    return function (dispatch) {
        dispatch({
            type: VP_HOLDER,
            payload: list
        });
    }
}