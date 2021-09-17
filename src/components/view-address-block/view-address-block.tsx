import React from "react";
import { withRouter } from "react-router";
import view_address from "../../assets/images/view_address.png";
import "./view-address-block.scss";

export const ViewAddressBlock = withRouter(({ history }) => {

    const onViewButtonClick = () => {
        history.push('/did-management');
    }

    return (
        <div className="view-address-block mb-4 row align-items-center">
            <div className="col-12 col-md-auto text-center">
                <img className="view-address-img" src={view_address} alt="View address" />
            </div>

            <div className="col-12 col-md w-100">
                <h4>View address</h4>
                <p>View your documents using only your address</p>
            </div>

            <div className="col-12 col-md-auto p-0">
                <button className="button button-lg primary w-100" onClick={onViewButtonClick}>View address</button>
            </div>
        </div>
    )
});