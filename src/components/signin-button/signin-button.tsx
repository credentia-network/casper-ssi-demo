import React from "react";
import { useHistory } from "react-router";
import { signin } from "../../common/actions/signin-actions";
import { store } from "../../common/store";
import './signin-button.scss';

const SigninButton = (props: any) => {
    const history = useHistory();

    const onButtonClick = () => {
        store.dispatch(signin() as any);

        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.signin.accountKey) {
                history.push('/did-management');
            }
            unsubscribe();
        });
    }

    return (
        <button className={`button primary ${props.className}`} onClick={onButtonClick}>Sign in</button>
    );
};

export default SigninButton;