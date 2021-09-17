import React from "react";
import { CasperSignerBlock } from "../../components/casper-signer-block/casper-signer-block";
import { LedgerBlock } from "../../components/ledger-block/ledger-block";
import { ViewAddressBlock } from "../../components/view-address-block/view-address-block";
import { Welcome } from "../../components/welcome/welcome";
import './home.scss';

export default class Home extends React.Component {
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
