export type CreateDidDialogCloseEventHandler = (data?: any) => void;

export interface CreateDidDialogProps {
    onClose?: CreateDidDialogCloseEventHandler;
}