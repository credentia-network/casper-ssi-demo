export type ViewDidDialogCloseEventHandler = (data?: any) => void;

export interface ViewDidReadDialogProps {
    credentialType: string;
    onClose?: ViewDidDialogCloseEventHandler;
}
