import React from "react";
import { store } from "../../common/store";
import { AccountDropdown } from "../account-dropdown/account-dropdown";
import { Logo } from "../logo/logo";
import SigninButton from "../signin-button/signin-button";
import { Title } from "../title/title";
import "./header.scss";

export default class Header extends React.Component {    
    render() {
        const isSignedIn = store.getState().signin.accountKey;

        return (
            <header className="app-header">
                <Logo></Logo>
                <Title></Title>

                <div className="spacer"></div>

                {!!isSignedIn &&
                    <AccountDropdown></AccountDropdown>}

                {!isSignedIn &&
                    <SigninButton></SigninButton>}

            </header>
        );
    }
}
