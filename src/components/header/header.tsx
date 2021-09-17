import React from "react";
import { store } from "../../common/store";
import { AccountDropdown } from "../account-dropdown/account-dropdown";
import { Logo } from "../logo/logo";
import { SigninButton } from "../signin-button.tsx/signin-button";
import { Title } from "../title/title";
import "./header.scss";

export default class Header extends React.Component {
    state = { isSignedIn: false };

    componentDidMount() {
        store.subscribe(() => {
            this.setState(state => ({
                isSignedIn: !!store.getState().signin.accountKey
            }));
        });
    }

    render() {
        return (
            <header className="app-header">
                <Logo></Logo>
                <Title></Title>

                <div className="spacer"></div>

                {(!!this.state.isSignedIn &&
                    <AccountDropdown></AccountDropdown>) ||
                    <SigninButton></SigninButton>}

            </header>
        );
    }
}
