import * as React from "react";
import { ViewDidReadDialogProps } from "./view-did-read-dialog-props";
import ReactModal from "react-modal";
import './view-did-read-dialog.scss'
import { InputField } from "../input-field/input-field";
import { Button } from "../button/button";
import { store } from "../../common/store";
import DATA_FIELDS_SHEMA from "../../common/data-fields-shema";


export class ViewDidReadDialog extends React.Component<ViewDidReadDialogProps, any> {

    constructor(props: ViewDidReadDialogProps) {
        super(props);

        const storeState = store.getState();
        const vc = storeState.holder.vcs.find(t => t.type.indexOf(this.props.credentialType) > -1);
        const schema = DATA_FIELDS_SHEMA.find(t => t.credentialType == this.props.credentialType);
        if (vc && schema) {
            const entries = Object.entries(vc.credentialSubject);
            this.state = {
                title: schema.title,
                data: entries.map(ent => {
                    const [key, value] = ent;
                    const item = schema.items.find(x => {
                        const [k, v]: any = Object.entries(x)[0];
                        return k.toLowerCase() == key.toLowerCase();
                    });
                    const title = item ? item[key] : null;

                    return title ? { title, value } : null;
            }).filter(t => !!t)
        };
    }
}

render() {
    return (
        <ReactModal className="view-did-read-dialog d-flex flex-column justify-content-between "
            isOpen={true}>
            <h4 className="mb-3"> View DID Document
            </h4>

            <div className="mb-3">
                <h5>{this.state?.title}</h5>
                {!!this.state?.data?.length &&
                    this.state?.data.map((item, index) =>
                        <InputField key={'item-' + index} label={item.title} value={item.value} className="mb-2" />
                    )
                }
            </div>

            <div className="d-flex justify-content-end">
                <Button className="me-2" onClick={this.props.onClose}>Close</Button>
            </div>
        </ReactModal>
    );
}
}
