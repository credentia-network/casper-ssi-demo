import React from "react"
import "./casper-signer-block.scss";
import casper_signer from "../../assets/images/casper_signer.png";

export class CasperSignerBlock extends React.Component {
    render() {
        return (
            <div className="casper-signer-block mb-4 d-flex align-items-center">
                <img className="casper-signer-img" src={casper_signer} alt="Casper signer" />

                <div className="px-4 w-100">
                    <h4>Casper Signer</h4>
                    <p>Connect and sign in via Google Chrome extension</p>
                </div>

                <div className="flex-shrink-1">
                    <button className="button button-lg primary mb-3">Sign In</button>
                    <button className="button button-lg">Download signer</button>
                </div>
            </div>
        );
    }
}
