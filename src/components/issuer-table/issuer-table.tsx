import dayjs from 'dayjs';
import * as React from 'react';
import { truncDid } from '../../common/helpers/trunc-did';
import { store } from '../../common/store';
import { Label } from '../label/label';
import { IssuerTableProps } from "./issuer-table-props";


export class IssuerTable extends React.Component<IssuerTableProps, any> {
    private storeChangeSubscription;

    constructor(props: IssuerTableProps) {
        super(props);

        const storeState = store.getState();
        this.state = {
            list: storeState.vcList.list || []
        };
        console.log(this.state);
    }

    componentDidMount() {
        this.storeChangeSubscription = store.subscribe(() => {
            const storeState = store.getState();
            this.setState(() => {
                return {
                    ...this.state,
                    list: storeState.vcList.list || []
                }
            });
        });
    }

    componentWillUnmount() {
        this.storeChangeSubscription && this.storeChangeSubscription();
        this.storeChangeSubscription = null;
    }

    formatDate(date: string): string {
        return date ? (dayjs as any).utc(date).format('hh:mm:ss (UTC) DD MMM YYYY') : null;
    }

    render() {
        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">State</th>
                        <th scope="col">DID</th>
                        <th scope="col">Role</th>
                        <th scope="col">Created</th>
                        <th scope="col">Deactivated</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state &&
                        this.state.list.map(item => {
                            return <tr>
                                <th><Label name={item.active ? 'Active' : 'Deactivated'} color={item.active ? 'success' : 'danger'}></Label></th>
                                <td>{truncDid(item.did)}</td>
                                <td>{item.role}</td>
                                <td>{this.formatDate(item.createDate)}</td>
                                <td>{item.active ? '-' : this.formatDate(item.deactivateDate)}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button className="button primary button-sm me-2" onClick={this.props.onClick}>Revoke</button>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
        );
    }
}
