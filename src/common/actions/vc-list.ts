import { VerifiableCredentials } from "../contracts/verifiable-credentials"
import { VC_LIST } from "../reducers/types"


export function vcListAction(list: VerifiableCredentials[]) {
    return function (dispatch) {
        dispatch({
            type: VC_LIST,
            payload: list
        });
    }
}