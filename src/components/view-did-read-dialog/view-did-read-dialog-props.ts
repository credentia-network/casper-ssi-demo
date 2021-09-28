export type ViewDidDialogCloseEventHandler = (data?: any) => void;

export interface ViewDidReadDialogProps {
    onClose?: ViewDidDialogCloseEventHandler;
}
