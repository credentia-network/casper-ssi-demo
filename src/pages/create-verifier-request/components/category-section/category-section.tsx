import React from "react";
import { ButtonCreateVerifier } from "../../../../components/button-create-verifier/button-create-verifier";
import { CategorySectionProps } from "./category-section-props";

export class CategorySection extends React.Component<CategorySectionProps, any> {
    constructor(props: CategorySectionProps) {
        super(props);
        const state = {};
        this.props.items.forEach(t => state[t.key] = t.checked);
        this.state = state;
    }

    render() {
        const children = this.props.items.map((t, i) =>
            (<ButtonCreateVerifier key={`item-${t.key}-${i}`} toggle={this.state[t.key]} title={t.title} onClick={() => this.handleClick(t.key)} />)
        );

        return (
            <div>
                <h5 className="mb-2">{this.props.category}</h5>
                <div className="mb-2 d-flex flex-lg-wrap">
                    {children}
                </div>
            </div>
        );
    }

    private handleClick = (key: string) => {
        if (this.props.readonly) {
            return;
        }

        this.setState({
            ...this.state,
            [key]: !this.state[key]
        });
        this.props.onToggleCategoryItem && this.props.onToggleCategoryItem(key);
    }
}