import * as React from 'react';
import { truncateStr } from '../../common/helpers/truncate-str';
import { store } from '../../common/store';
import { Label } from '../label/label';
import { VerifiableCredentialsDialog } from '../verifiable-credentials-dialog/verifiable-credentials-dialog';

export class VerefierTable extends React.Component<any, any> {
    private storeChangeSubscription: any;

    constructor(props: any) {
        super(props);

        const storeState = store.getState();
        this.state = {
            list: storeState.vpRequest.list as any[],
            viewDialogVpRequest: null
        } as any;

        console.log(storeState.vpRequest.list);
    }

    componentDidMount() {
        this.storeChangeSubscription = store.subscribe(() => {
            const storeState = store.getState();
            this.setState(() => {
                return {
                    ...this.state,
                    list: storeState.vpRequest.list.filter(t => !!t.credentialSubject)
                }
            });
        });
    }

    componentWillUnmount() {
        this.storeChangeSubscription && this.storeChangeSubscription();
        this.storeChangeSubscription = null;
    }

    onViewButtonClick(vpRequest: any) {
        return () => {
            this.toggleVerifiableCredentialsDialog(vpRequest);
        }
    }

    onVerifiableCredentialsDialogClose = () => {
        this.toggleVerifiableCredentialsDialog(null);
    }

    toggleVerifiableCredentialsDialog(viewDialogVpRequest: any) {
        this.setState({
            ...this.state,
            viewDialogVpRequest
        });
    }

    render() {
        return (
            <>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">State</th>
                            <th scope="col">Holder</th>
                            <th scope="col">Description</th>
                            <th scope="col">VC ID</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state &&
                            this.state.list.map((item, index) => {
                                return <tr key={'key-' + index}>
                                    <th>
                                        {!item.status &&
                                            <Label name="Pending" color="second"></Label>}
                                        {item.status == 1 &&
                                            <Label name="Provided" color="success"></Label>}
                                    </th>
                                    <td>{truncateStr(item.holder)}</td>
                                    <td>-</td>
                                    <td>{truncateStr(item.ipfsHash)}</td>
                                    <td>
                                        {item.status == 1 &&
                                        <button className="button primary button-sm  float-end" onClick={this.onViewButtonClick(item)}>View</button>}
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </table>
                {this.state.viewDialogVpRequest &&
                    <VerifiableCredentialsDialog vpRequest={this.state.viewDialogVpRequest} onClose={this.onVerifiableCredentialsDialogClose}></VerifiableCredentialsDialog>}
            </>
        );
    }
}
