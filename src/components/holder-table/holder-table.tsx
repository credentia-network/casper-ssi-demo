import * as React from 'react';
import { store } from '../../common/store';
import { Label } from '../label/label';

export class HolderTable extends React.Component<any, any> {
    private storeChangeSubscription: any;

    constructor(props: any) {
        super(props);

        const storeState = store.getState();
        this.state = {
            list: storeState.vpHolder.list.filter(t => !!t.credentialSubject) as any[]
        } as any;
    }

    componentDidMount() {
        this.storeChangeSubscription = store.subscribe(() => {
            const storeState = store.getState();
            this.setState(() => {
                return {
                    ...this.state,
                    list: storeState.vpHolder.list.filter(t => !!t.credentialSubject)
                }
            });
        });
    }

    componentWillUnmount() {
        this.storeChangeSubscription && this.storeChangeSubscription();
        this.storeChangeSubscription = null;
    }

    render() {
        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">State</th>
                        <th scope="col">Requester</th>
                        <th scope="col">Description</th>
                        <th scope="col">VC ID</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state &&
                        this.state.list.map((item: any, index) => {
                            return <tr key={'row-' + index}>
                                <th><Label name="Active" color="success"></Label></th>
                                <td>{item.issuer.id}</td>
                                <td>-</td>
                                <td>{item.ipfsHash}</td>
                                <td>
                                    <button className="button primary button-sm me-2 float-end">Consider</button>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
        );
    }
}
