import React from "react";
import { PillTabProps } from "./pill-tab-props";
import './pill-tab.scss';
import { ReactComponent as ArrowRight} from '../../assets/images/arrow-right.svg';

export class PillTab extends React.Component<PillTabProps> {
    render() {
        return (
            <div className="pill-tab d-flex p-3">
                <div>
                    <h4 className="pill-tab-title">{this.props.title}</h4>
                    <p className="pill-tab-description">{this.props.description}</p>
                </div>

                <div>
                    <a className={'pill-tab-link link-color-' + this.props.color} href={this.props.link}>
                        <ArrowRight></ArrowRight>
                    </a>
                </div>
            </div>
        )
    }
}
