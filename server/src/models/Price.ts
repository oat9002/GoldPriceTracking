import { DocumentData } from "firebase-admin/firestore";

export interface Price {
    buy: number;
    buyDifferent: number;
    sell: number;
    sellDifferent: number;
    createdAt: Date;
}

export function mapPriceFromDb(db: DocumentData): Price {
    return {
        buy: db.buy,
        sell: db.sell,
        createdAt: db.created_at.toDate(),
        buyDifferent: db.buyDifferent,
        sellDifferent: db.sellDifferent,
    };
}
