import React from "react";
import { ReactComponent as LogoSvg } from "../../assets/images/logo.svg";

export class Logo extends React.Component {
    render() {
        return (
            <div>
                <LogoSvg></LogoSvg>
            </div>
        );
    }
}
