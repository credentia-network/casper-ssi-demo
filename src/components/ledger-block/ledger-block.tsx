import React from "react";
import "./ledger-block.scss";
import ledger from "../../assets/images/ledger.png";

export class LedgerBlock extends React.Component {
    render() {
        return (
            <div className="ledger-block mb-4 row align-items-center">
                <div className="col-12 col-md-auto text-center">
                    <img className="ledger-img" src={ledger} alt="Ledger" />
                </div>
                
                <div className="col-12 col-md w-100">
                    <h4>Ledger</h4>
                    <p>Connect and sign in with your Ledger wallet</p>
                </div>

                <div className="col-12 col-md-auto p-0">
                    <button className="button button-lg primary w-100">Connect</button>
                </div>
            </div>
        )
    }
}
