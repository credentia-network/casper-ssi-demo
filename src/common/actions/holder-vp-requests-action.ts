import { HOLDER_REQUESTS } from "../reducers/types";

export function holderSdrRequestsAction(payload: any) {
    return function (dispatch) {
        dispatch({
            type: HOLDER_REQUESTS,
            payload
        });
    }
}
