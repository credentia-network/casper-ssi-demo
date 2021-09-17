import React from "react"
import "./casper-signer-block.scss";
import casper_signer from "../../assets/images/casper_signer.png";
const { Keys } = require("casper-js-sdk");

export class CasperSignerBlock extends React.Component {
    render() {
        return (
            <div className="casper-signer-block mb-4 row align-items-center">
                <div className="col-12 col-md-auto text-center">
                    <img className="casper-signer-img" src={casper_signer} alt="Casper signer" />
                </div>

                <div className="col-12 col-md w-100">
                    <h4>Casper Signer</h4>
                    <p>Connect and sign in via Google Chrome extension</p>
                </div>

                <div className="col-12 col-md p-0">
                    <button className="button button-lg primary mb-3" onClick={this.onSingnInButtonclick}>Sign In</button>
                    <button className="button button-lg">Download signer</button>
                </div>
            </div>
        );
    }

    private onSingnInButtonclick = () => {

    }

}
