
export interface CategorySectionProps {
    category: string;
    items: Array<{ key: string, title: string, checked: boolean }>;
    readonly?: boolean;
    onToggleCategoryItem?: (key: string) => void;
}