import * as React from 'react';
import { store } from '../../common/store';
import {ReactComponent as Union} from '../../assets/images/union.svg';
import {ReactComponent as Vector} from '../../assets/images/vector.svg';
import './account-dropdown.scss';

export class AccountDropdown extends React.Component<any, any> {
    state = { accountKey: this.cutKey(store.getState().signin.accountKey) };

    render() {
        return (
            <div className="account-dropdown d-flex">
                <div className="union">{Union}</div>
                <div>{this.state.accountKey}</div>
                <div className="text-white">{Vector}</div>
            </div>
        );
    }

    private cutKey(key: string): string {
        return `${key.substr(0, 5)}...${key.substr(key.length - 6)}`;
    }
}