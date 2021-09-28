import * as React from 'react';
import { StepperProps } from './stepper-props';
import "./stepper.scss";

export class Stepper extends React.Component<StepperProps> {
    render() {
        const len = this.props.steps.length;
        return (
            <div className="d-flex align-items-center app-stepper">
                {
                    this.props.steps.map((step, index) => 
                        this.renderStep(step, index, this.props.active, len === index + 1))
                }
            </div>
        );
    }    

    private renderStep(step: string, currentIndex: number, active: number, isLast = false) {
        const state = this.getStepStateClass(currentIndex, active, isLast)
        return (<div key={'step-wrapper-' + currentIndex} className="flex-fill">
            <div key={'step-block-' + currentIndex} className="d-flex align-items-center">
                <div key={'step-' + currentIndex} className={'step ' + state}></div>
                {!isLast &&
                    this.renderConnector(currentIndex, !!state)}                
            </div>            
            <div key={'step-name-' + currentIndex} className="step-name text-nowrap">{step}</div>
        </div>);
    }

    private getStepStateClass(currentIndex: number, active: number, isLast = false): string {
        let state = '';
        if (active === currentIndex) {
            state = 'active-' + this.props.page;
        }
        if (active > currentIndex) {
            state = 'completed-' + this.props.page;
        }

        if (isLast) {
            state += ' last-' + this.props.page;
        }

        return state;
    }

    private renderConnector(currentIndex: number, active = false) {
        return (
            <div key={'connector-' + currentIndex} className={'connector ' + (active ? 'active-' + this.props.page : '')}></div>
        )
    }
}
