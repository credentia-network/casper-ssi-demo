import * as React from 'react';
import { Button } from '../button/button';
import { CategoriesBarProps } from './categories-bar-props';
import { CategoriesBarState } from './categories-bar-state';
import "./categories-bar.scss";

export class CategoriesBar extends React.Component<CategoriesBarProps, CategoriesBarState> {
    constructor(props: CategoriesBarProps) {
        super(props);
        this.state = { active: props.active };
    }

    render() {
        return (
            <div className="d-flex categories-bar">
                {this.props.categories.map((item, index) =>
                    <div className="category-item" key={`category-item-${index}`}>
                        <p className="fw-bolder text-nowrap mb-1">{item.title}</p>
                        <Button color="outline" size="sm" className={'text-nowrap px-3' + (this.state.active === index ? ' active' : '')} 
                            onClick={this.onCategoryClick.bind(this, index)}>{item.button}</Button>
                    </div>
                )}
            </div>
        );
    }

    private onCategoryClick(index: number) {
        const item = this.props.categories[index];
        this.setState(state => ({ ...state, active: index }));
        if (this.props.onSelectCategory) {
            this.props.onSelectCategory(item.value);
        }
    }
}