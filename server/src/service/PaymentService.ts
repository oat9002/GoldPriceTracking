import omiseSdk from "omise";
import { OmiseToken } from "../models/payment/OmiseToken";
import { OmiseChargeResponse } from "./../models/payment/OmiseChargeResponse";

const omise = omiseSdk({
    secretKey: process.env.OMISE_SECRET_KEY ?? "",
    publicKey: process.env.OMISE_PUBLIC_KEY ?? "",
});

export async function charge(
    description: string,
    amount: number,
    currency: string,
    token: OmiseToken
): Promise<OmiseChargeResponse> {
    const returnUrl = process.env.WEBSITE_URL + "donate/complete";
    const res = await omise.charges.create({
        description,
        currency,
        amount,
        card: token.omiseToken,
        source: token.omiseSource,
        return_uri: returnUrl,
    });

    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status: res.status as string,
        returnUrl,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authorizeUrl: res.authorize_uri as string,
        failureCode: res.failure_code,
        failureMessage: res.failure_message,
    };
}
