export interface OmiseChargeResponse {
    status: string;
    authorizeUrl: string;
    returnUrl: string;
    failureCode: string;
    failureMessage: string;
}
