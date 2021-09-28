import * as React from 'react';
import { Label } from '../label/label';
import {IssuerTableProps} from "./issuer-table-props";

export class IssuerTable extends React.Component<IssuerTableProps> {
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
                    <tr>
                        <th><Label name="Active" color="success"></Label></th>
                        <td>01eec...e0214</td>
                        <td>Holder</td>
                        <td>17:11:02 (UTC) 11 May 2021</td>
                        <td>-</td>
                        <td>Lectus mattis nulla neque</td>
                        <td>
                            <button className="button primary button-sm me-2" onClick={this.props.onClick}>Revoke</button>
                        </td>
                    </tr>
                    <tr>
                        <th><Label name="Deactivated" color="danger"></Label></th>
                        <td>01eec...e0214</td>
                        <td>Holder</td>
                        <td>17:11:02 (UTC) 11 May 2021</td>
                        <td>02:31:42 (UTC) 24 July 2021</td>
                        <td>Lectus mattis nulla neque</td>
                        <td>
                            <button className="button primary button-sm me-2" onClick={this.props.onClick}>Revoke</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
