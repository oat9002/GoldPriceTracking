import omiseSdk from "omise";
import { OmiseToken } from "./../models/OmiseToken";

const omise = omiseSdk({
    secretKey: process.env?.OMISE_SECRET_KEY ?? "",
    publicKey: process.env?.OMISE_PUBLIC_KEY ?? "",
});

export async function charge(
    description: string,
    amount: number,
    currency: string,
    omiseToken: OmiseToken
) {
    const res = await omise.charges.create({
        description,
        currency,
        amount,
        card: omiseToken.token,
        source: omiseToken.source,
    });

    if (!res.paid) {
        throw res.failure_code;
    }
}
