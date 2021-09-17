import React from "react";
import "./welcome.scss";

export class Welcome extends React.Component {
    render() {
        return (
            <div className="app-welcome-block">
                <h1>Welcome to the SSI Framework</h1>

                <p>In order to start working with your documents - you need to log in. You can use any wallet compatible with Casper.</p>

                <p>Or you can use the "View Address" to view the document states of any DID.</p>

                <h3>Why do I need to log in?</h3>

                <p>Your documents are tied to your identifier, so a public key is needed to get a list of documents associated with you.</p>

                <h3>Don’t have an account?</h3>

                <a href="#">Create Account -&gt;</a>
            </div> 
        );
    }
}
