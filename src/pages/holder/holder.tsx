import * as React from 'react';
import { BackButton } from '../../components/back-button/back-button';
import { Pagetitle } from '../../components/page-title/page-title';

export class Holder extends React.Component {
    render() {
        return (
            <div>

                <div className="d-flex p-3">
                    <div className="me-4">
                        <BackButton link="/did-management" color="pink"></BackButton>
                    </div>
 
                    <Pagetitle title="holder" subtitle="Verifiable Credentials"></Pagetitle>
                </div>

                <h4 className="mb-4">View and share VC issued to you</h4>

                <p>In this tab you can create and sign (issue) VC documents for a specific recipient (including yourself). The issued document can be revoked and its data can be viewed.</p>

                 

            </div>
        );
    }
}