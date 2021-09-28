
export type DidEnterEventHandler = (did: string | null) => void;

export interface ReceiverDidFieldProps {
    onDidEnter?: DidEnterEventHandler
}
