
export interface VerifiableCredentials {
    active: boolean;
    did: string;
    role: string;
    createDate: string;
    deactivateDate?: string | null;
    description?: string | null;
}
