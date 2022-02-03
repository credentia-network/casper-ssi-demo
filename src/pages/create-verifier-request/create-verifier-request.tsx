import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { createVerifyRequestAction } from '../../common/actions/create-verify-request-action';
import { readVpRequestAction } from '../../common/actions/read-vp-requests-action';
import DATA_FIELDS_SHEMA from '../../common/data-fields-shema';
import { store } from '../../common/store';
import { BackButton } from '../../components/back-button/back-button';
import { Pagetitle } from '../../components/page-title/page-title';
import { Stepper } from "../../components/stepper/stepper";
import { ChooseFields } from './components/choose-fields/choose-fields';
import { SaveRequest } from './components/save-request/save-request';
import './create-verifier.scss';

class CreateVerifierRequest extends React.Component<RouteComponentProps<any>, any> {
    steps = ['Choose fields', 'Send VC request'];
    history = this.props.history;

    constructor(props: RouteComponentProps<any>) {
        super(props);

        this.state = {
            step: 0,
            fields: {}
        };
    }

    onToggleCategoryItem = (key: string) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [key]: !this.state[key]
            }
        });
    }

    onCreateButtonClick = () => {
        this.setState({
            ...this.state,
            step: 1
        });
    }

    onSaveButtonClick = () => {
        const fields = Object.entries(this.state.fields as any).filter(([_, v]) => !!v).map(([k]) => k);
        createVerifyRequestAction({holderDid: this.state.holderDid, fields})
            .then(fn => store.dispatch(fn))
            .then(() => store.dispatch(readVpRequestAction()))
            .then(() => this.history.push('/did-management'));
    }

    getSelectedCategories() {
        return DATA_FIELDS_SHEMA.map((t, i) => {
            const items = t.items.filter((it: any) => {
                const [key] = Object.entries(it)[0];
                return this.state.fields[key] == true;
            });
            return items.length ? { ...t, items } : null;
        })
            .filter(t => !!t);
    }

    onHolderDidInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            holderDid: event.target.value
        });
    }

    render() {
        return (
            <div>

                <div className="d-flex p-3">
                    <div className="me-4">
                        <BackButton link="/did-management" color="purpure"></BackButton>
                    </div>

                    <Pagetitle title="verifier" subtitle="Verifiable Credentials"></Pagetitle>
                </div>

                <h4 className="mb-4">Request and verify third party VC</h4>

                <div>
                    <p>In this tab you can create and sign (issue) VC documents for a specific recipient (including
                        yourself). The issued document can be revoked and its data can be viewed.</p>
                </div>

                <Stepper steps={this.steps} page="verifier" active={this.state.step + 1}></Stepper>

                <div>
                    {this.state.step == 0 &&
                        <>
                            <ChooseFields categories={DATA_FIELDS_SHEMA} onToggleCategoryItem={this.onToggleCategoryItem}></ChooseFields>

                            <div className="w-50">
                                <label className="form-label">Holder's DID</label>

                                <div className="d-flex">
                                    <input className="form-control me-2" onChange={this.onHolderDidInputChange} />
                                </div>
                            </div>
                        </>}


                    {this.state.step == 1 &&
                        <SaveRequest categories={this.getSelectedCategories()}></SaveRequest>}
                </div>
                <div className="mt-4">
                    <Link to="/did-management"><button className="btn-close mb-2">Close</button></Link>
                    {this.state.step == 0 &&
                        <button className="btn-create" onClick={this.onCreateButtonClick}>Create</button>}
                    {this.state.step == 1 &&
                        <button className="btn-create" onClick={this.onSaveButtonClick}>Save</button>}
                </div>
            </div>
        );
    }
}

export default withRouter(CreateVerifierRequest);
