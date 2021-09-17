export interface CategoriesBarProps {
    active?: number;
    categories: CategoriesBarItem[];
}

export interface CategoriesBarItem {
    title: string;
    button: string;
}