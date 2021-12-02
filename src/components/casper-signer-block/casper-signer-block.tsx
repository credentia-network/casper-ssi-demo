import React from "react";
import casper_signer from "../../assets/images/casper_signer.png";
import SigninButton from "../signin-button/signin-button";
import "./casper-signer-block.scss";


export class CasperSignerBlock extends React.Component<any, any> {
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
                    <SigninButton className="button-lg color-red mb-3"></SigninButton>
                    <a role="button" className="button button-lg" target="_blank" href="https://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce?utm_source=chrome-ntp-icon">Download signer</a>
                </div>
            </div>
        );
    }
}
