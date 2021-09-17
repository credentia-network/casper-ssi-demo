import React from "react";
import "./ledger-block.scss";
import ledger from "../../assets/images/ledger.png";

export class LedgerBlock extends React.Component {
    render() {
        return (
            <div className="ledger-block mb-4 d-flex align-items-center">
                <img className="ledger-img" src={ledger} alt="Ledger" />
                
                <div className="px-4 w-100">
                    <h4>Ledger</h4>
                    <p>Connect and sign in with your Ledger wallet</p>
                </div>

                <div className="flex-shrink-1">
                    <button className="button button-lg primary">Connect</button>
                </div>
            </div>
        )
    }
}
