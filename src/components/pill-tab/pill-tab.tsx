import React from "react";
import { PillTabProps } from "./pill-tab-props";
import './pill-tab.scss';
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right.svg';
import { Link } from "react-router-dom";

export class PillTab extends React.Component<PillTabProps> {
    render() {
        return (
            <div className="pill-tab d-flex p-3">
                <div>
                    <h4 className="pill-tab-title">{this.props.title}</h4>
                    <p className="pill-tab-description">{this.props.description}</p>
                </div>

                <div>
                    <Link to={this.props.link} className={'pill-tab-link link-color-' + this.props.color}>
                        <ArrowRight></ArrowRight>
                    </Link>
                </div>
            </div>
        )
    }
}
