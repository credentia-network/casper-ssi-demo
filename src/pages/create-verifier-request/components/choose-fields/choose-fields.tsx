import React from "react";
import { CategorySection } from "../category-section/category-section";
import { ChooseFieldsProps } from "./choose-fields-props";

export function ChooseFields(props: ChooseFieldsProps) {
    const categories = props.categories.map((t, i) => {
        const items = t.items.map((it: any) => {
            const [key, title] = Object.entries(it)[0];
            return { key, title, checked: !!props.allChecked };
        });
        return (<CategorySection key={`category-${i}`} readonly={props.readonly} category={t.title} items={items as any} onToggleCategoryItem={props.onToggleCategoryItem}></CategorySection>);
    });

    return (<>{categories}</>);
}