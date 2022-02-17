import * as React from 'react';
import ReactModal from 'react-modal';
import { changeVpRequestStatus } from '../../common/actions/change-vp-request-status-action';
import DATA_FIELDS_SHEMA from '../../common/data-fields-shema';
import { store } from '../../common/store';
import { Button } from '../button/button';
import { InputField } from "../input-field/input-field";
import { ViewDidDialogProps } from "./view-did-dialog-props";
import "./view-did-dialog.scss";

ReactModal.defaultStyles = {}

type ViewDidDialogState = { vpRequest: any, data: Array<{ title: string, credentialType: string, items: { title: string, field: string, value: string }[] }> };

export class ViewDidDialog extends React.Component<ViewDidDialogProps, ViewDidDialogState> {
    togle = {
        personal: true,
        education: true
    };

    constructor(props: ViewDidDialogProps) {
        super(props);

        this.state = {
            vpRequest: this.props.vpRequest,
            data: this.mapData(this.props.vpRequest)
        };
    }

    changeChecked = (event, key, prop) => {
        //this.setState({ ...this.state, [key]: { ...this.state[key], [prop]: { checked: event.target.checked } } })
    }

    render() {
        return (
            <ReactModal className="view-did-dialog d-flex flex-column justify-content-between"
                isOpen={true}>
                <div className="overflow-auto scroll-hide field-box">

                    <h5 className="fw-bold mb-3 mt-2">VC Request permission</h5>

                    {this.state.data.map((category, index) =>
                        <div className="mb-3" key={'category-' + index}>

                            <div className="d-flex flex-row justify-content-between mb-2">
                                <div className="fw-bold ">{category.title}</div>
                            </div>
                            {category.items.map((item, itemIndex) => <InputField key={'item-' + itemIndex} label={item.title} value={item.value} className="mb-2" />)}
                        </div>
                    )}
                </div>
                {!this.state.vpRequest.status &&
                    <div className="d-flex justify-content-end align-items-center btn-box">
                        <Button onClick={this.onCancelButtonClick} className="m-lg-1">Cancel</Button>
                        <Button onClick={this.onRejectButtonClick} className="ms-2 bg-danger text-white">Reject request</Button>
                        <Button color="primary" className="m-lg-1" onClick={this.onApproveButtonClick}>Approve</Button>
                    </div>
                }
                {this.state.vpRequest.status &&
                    <div className="d-flex justify-content-end align-items-center btn-box">
                        <Button onClick={this.onCancelButtonClick} className="m-lg-1">Close</Button>
                    </div>
                }
            </ReactModal>
        );
    }

    private onCancelButtonClick = () => {
        this.emitCloseEvent();
    }

    private onRejectButtonClick = () => {
        // rejectVpRequest(this.props.vpRequest)
        //     .then(() => this.emitCloseEvent());
        store.dispatch(changeVpRequestStatus(this.props.vpRequest.ipfsHash, 2, []));
        this.emitCloseEvent();
    }

    private onApproveButtonClick = () => {
        const data = this.state.data.map(t => ({
            credentialType: t.credentialType,
            items: t.items.map(x => ({ field: x.field, value: x.value }))
        }));
        store.dispatch(changeVpRequestStatus(this.props.vpRequest.ipfsHash, 1, data));
        this.emitCloseEvent();
    }

    private emitCloseEvent(data?: any) {
        if (this.props.onClose) {
            this.props.onClose(data);
        }
    }

    private mapData(vcRequest: any): any {
        const categories = DATA_FIELDS_SHEMA.filter(group => vcRequest.claims.some(c => group.items.some(t => !!t[c.claimType])));
        const result = categories.map(c => {
            const items: any = [];
            c.items.forEach(t => {
                const entries = Object.entries(t)[0];
                const [field, title] = entries;
                if (vcRequest.claims.some(x => field == x.claimType)) {
                    const value = this.findValueByField(field);
                    if (value) {
                        items.push({ title, field, value });
                    }
                }
            });
            return {
                credentialType: c.credentialType,
                title: c.title,
                items
            }
        })
            .filter(t => !!t.items.length);
        return result;
    }

    private findValueByField(field: string): string | null {
        const state = store.getState();
        const vc = state.holder?.vcs.find(t => t.credentialSubject[field]);
        return vc?.credentialSubject[field] || null;
    }
}
