import React from "react";
import { SignerHelper } from "../../common/helpers/signer-helper";
import './signin-button.scss';

const SigninButton = (props: any) => {
    

    const onButtonClick = () => {
        SignerHelper.sendConnectionRequest();

        // const unsubscribe = store.subscribe(() => {
        //     const state = store.getState();
        //     if (state.signin.publicKey) {
        //         history.push('/did-management');
        //     }
        //     unsubscribe();
        // });
    }

    return (
        <button className={`button primary ${props.className}`} onClick={onButtonClick}>Sign in</button>
    );
};

export default SigninButton;