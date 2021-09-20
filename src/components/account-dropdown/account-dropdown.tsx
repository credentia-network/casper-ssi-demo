import * as React from 'react';
import { store } from '../../common/store';
import {ReactComponent as Union} from '../../assets/images/union.svg';
import {ReactComponent as Vector} from '../../assets/images/vector.svg';
import './account-dropdown.scss';

export class AccountDropdown extends React.Component {
    state = {key: this.getShorterKey()};

    render() {
        return (
            <div className="account-dropdown d-flex text-white">
                <div className="union">{<Union></Union>}</div>
                <div className="px-2">{this.state.key}</div>
                <div className="text-white">{<Vector></Vector>}</div>
            </div>
        );
    }

    private getShorterKey(): string {
        const state = store.getState();
        const publicKey = state.signin.publicKey;
        return `${publicKey.substr(0, 5)}...${publicKey.substr(publicKey.length - 6)}`;
    }
}