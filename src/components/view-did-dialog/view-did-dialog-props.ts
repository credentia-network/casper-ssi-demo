export type CreateDidDialogCloseEventHandler = (data?: any) => void;

export interface ViewDidDialogProps {
    vpRequest: any;
    onClose?: CreateDidDialogCloseEventHandler;
}
