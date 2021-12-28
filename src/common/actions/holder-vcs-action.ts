import { HOLDER_VC } from "../reducers/types";

export function holderVcsAction(payload: any) {
    return function (dispatch) {
        dispatch({
            type: HOLDER_VC,
            payload
        });
    }
}
