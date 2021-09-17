import React from "react";
import "./view-address-block.scss";
import view_address from "../../assets/images/view_address.png";

export class ViewAddressBlock extends React.Component {
    render() {
        return (
            <div className="view-address-block mb-4 d-flex align-items-center">
                <img className="view-address-img" src={view_address} alt="View address" />

                <div className="px-4 w-100">
                    <h4>View address</h4>
                    <p>View your documents using only your address</p>
                </div>

                <div className="flex-shrink-1">
                    <button className="button button-lg primary">View address</button>
                </div>
            </div>
        )
    }
}
