import { STATUS_VP_REQUEST } from "../reducers/types";
import { store } from "../store";

export function changeVpRequestStatus(ipfsHash: string, status: number) {
    return function (dispatch) {
        const state = store.getState();
        const vp =  state.holder.requests.find(t => t.ipfsHash == ipfsHash);
        vp.status = status;
        dispatch({type: STATUS_VP_REQUEST, payload: state.holder.requests });
    }    
}
