export type DidCreatedSuccessDialogCloseEventHandler = (data?: any) => void;

export interface DidCreatedSuccessDialogProps {
    onClose?: DidCreatedSuccessDialogCloseEventHandler;
}