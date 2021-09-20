import * as React from 'react';
import { Label } from '../label/label';

export class HolderTable extends React.Component {
    render() {
        return (
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th scope="col">State</th>
                    <th scope="col">Requester</th>
                    <th scope="col">VC ID</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th><Label name="Active" color="success"></Label></th>
                    <td>01eec...e0214</td>
                    <td>Contact details</td>
                    <td>DID: ex: 0987654321abcdef</td>
                    <td>
                        <button className="button primary button-sm me-2 float-end">Consider</button>
                    </td>
                </tr>
                <tr>
                    <th><Label name="Revocked" color="danger"></Label></th>
                    <td>01eec...e0214</td>
                    <td>Contact details and diploma</td>
                    <td>DID: ex: 0987654321abcdef</td>
                    <td>
                        <button className="button primary button-sm me-2 float-end ">Consider</button>
                    </td>
                </tr>
                <tr>
                    <th><Label name="Pending" color="warning"></Label></th>
                    <td>01eec...e0214</td>
                    <td>Contact details</td>
                    <td>DID: ex: 0987654321abcdef</td>
                    <td>
                        <button className="button primary button-sm me-2 w-3 float-end">Consider</button>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}
