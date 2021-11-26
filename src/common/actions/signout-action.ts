import { SIGNOUT } from "../reducers/types"

export function signoutAction() {
    return function (dispatch) {
        dispatch({
            type: SIGNOUT
        })
    }
}