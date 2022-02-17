
export interface ApprovedVerifiableCredentials {
    credentialType: string;
    items: ApprovedVerifiableCredentialsItem[];
}

export interface ApprovedVerifiableCredentialsItem {
    field: string;
    value: string;
}