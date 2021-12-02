
export interface ChooseFieldsProps {
    categories: any[];
    readonly?: boolean;
    allChecked?: boolean;
    onToggleCategoryItem?: (key: string) => void;
}
