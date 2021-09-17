import React from "react";
import { Logo } from "../logo/logo";
import { SigninButton } from "../signin-button.tsx/signin-button";
import { Title } from "../title/title";
import "./header.scss";

export default class Header extends React.Component {
    render() {
        return (
            <header className="app-header">
                <Logo></Logo>
                <Title></Title>
                
                <div className="spacer"></div>

                <SigninButton></SigninButton>
            </header>
        );
    }
}
