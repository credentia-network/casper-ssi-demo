import * as React from 'react';
import { truncateStr } from '../../common/helpers/truncate-str';
import { store } from '../../common/store';
import { Label } from '../label/label';

export class VerefierTable extends React.Component<any, any> {
    private storeChangeSubscription: any;

    constructor(props: any) {
        super(props);

        const storeState = store.getState();
        this.state = {
            list: storeState.vpRequest.list as any[],
            viewDialogOpenned: false
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

    render() {
        return (
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
                                <th><Label name="Provided" color="success"></Label></th>
                                <td>{truncateStr(item.holder)}</td>
                                <td>-</td>
                                <td>{truncateStr(item.ipfsHash)}</td>
                                <td>
                                    <button className="button primary button-sm  float-end ">Validate</button>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
        );
    }
}
