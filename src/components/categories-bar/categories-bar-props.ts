export type CategorySelectEventHandler = (index: number) => void;

export interface CategoriesBarProps {
    active?: number;
    categories: CategoriesBarItem[];
    onSelectCategory?: CategorySelectEventHandler;
}

export interface CategoriesBarItem {
    title: string;
    button: string;
}