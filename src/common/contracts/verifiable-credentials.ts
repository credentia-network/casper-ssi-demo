
export interface VerifiableCredentials {
    active: boolean;
    did: string;
    createDate: string;
    deactivateDate?: string | null;
    vcId: string;
    vc: any;
}
