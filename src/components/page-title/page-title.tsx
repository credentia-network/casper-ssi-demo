import * as React from 'react';
import { PageTitleProps } from './page-title-props';
import "./page-title.scss";

export class Pagetitle extends React.Component<PageTitleProps> {
    render() {
        return (
            <div className="d-flex flex-column page-title">
                <h4>{this.props.title}</h4>
                {!!this.props.subtitle &&
                    <p>{this.props.subtitle}</p>
                }
            </div>
        );
    }
}