import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { store } from "../../common/store";
import { KeyField } from "../../components/key-field/key-field";
import { PillTab } from "../../components/pill-tab/pill-tab";
import "./did-management.scss";

class DidManagement extends React.Component<RouteComponentProps<any>, any> {
    constructor(props) {
        super(props);

        const storeState = store.getState();

        if (!storeState.signin?.publicKey) {
            const history = this.props.history;
            history.push('/');
            return;
        }

        this.state = {
            createDialogOpenned: false,
            didCreated: false,
            ...storeState.signin
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex pt-3">
                    <PillTab title="issuer" description="Verifiable Credentials" link="issuer" color="blue"></PillTab>
                    <PillTab title="holder" description="Verifiable Credentials" link="holder" color="pink"></PillTab>
                    <PillTab title="verifier" description="Verifiable Credentials" link="verifier" color="purpure"></PillTab>
                </div>

                <h4 className="my-4">Account</h4>

                {this.state?.publicKey &&
                    <>
                        <KeyField name="Public Key" value={this.state?.publicKey}></KeyField>
                        <KeyField name="Account Hash" value={this.state?.accountHash}></KeyField>
                        <KeyField name="DID" value={this.state?.did}></KeyField>
                    </>
                }


            </div>
        )
    }
}

export default withRouter(DidManagement);