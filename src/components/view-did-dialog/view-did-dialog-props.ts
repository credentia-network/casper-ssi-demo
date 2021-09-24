export type CreateDidDialogCloseEventHandler = (data?: any) => void;

export interface ViewDidDialogProps {
    onClose?: CreateDidDialogCloseEventHandler;

}
