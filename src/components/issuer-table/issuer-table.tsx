import dayjs from 'dayjs';
import * as React from 'react';
import { truncateStr } from '../../common/helpers/truncate-str';
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
                        <th scope="col">Holder</th>
                        <th scope="col">Issued by</th>
                        <th scope="col">Valid until</th>
                        <th scope="col">VC ID</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state &&
                        this.state.list.map((item, i) => {
                            return <tr key={'tr-'+i}>
                                <th><Label name={item.active ? 'Active' : 'Deactivated'} color={item.active ? 'success' : 'danger'}></Label></th>
                                <td>{truncateStr(item.did, 27)}</td>
                                <td>{this.formatDate(item.createDate)}</td>
                                <td>{item.active ? '-' : this.formatDate(item.deactivateDate)}</td>
                                <td>{item.vcId}</td>
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
