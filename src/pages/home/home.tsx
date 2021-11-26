import React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { restoreSigninAction } from "../../common/actions/restore-sigin-action";
import { store } from "../../common/store";
import { CasperSignerBlock } from "../../components/casper-signer-block/casper-signer-block";
import { LedgerBlock } from "../../components/ledger-block/ledger-block";
import { ViewAddressBlock } from "../../components/view-address-block/view-address-block";
import { Welcome } from "../../components/welcome/welcome";
import './home.scss';

class Home extends React.Component<RouteComponentProps<any>, any> {
    componentDidMount() {
        const history = this.props.history;

        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.signin.publicKey) {
                unsubscribe();
                history.push('/did-management');
            }
        });

        store.dispatch(restoreSigninAction());
    }

    render() {
        return (
            <div className="row p-3 p-md-5">
                <div className="col-12 col-md p-md-5">
                    <Welcome></Welcome>
                </div>

                <div className="col col-md mt-4 mt-md-0 p-md-5">
                    <LedgerBlock></LedgerBlock>

                    <ViewAddressBlock></ViewAddressBlock>

                    <CasperSignerBlock></CasperSignerBlock>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);