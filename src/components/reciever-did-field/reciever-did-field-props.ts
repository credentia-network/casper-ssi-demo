
export type DidEnterEventHandler = (did: string) => void;

export interface ReceiverDidFieldProps {
    onDidEnter?: DidEnterEventHandler
}
