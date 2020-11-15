export interface Price {
    buy: number;
    buyDifferent: number;
    sell: number;
    sellDifferent: number;
    createdAt: Date;
}

export function mapPriceFromDb(db: any): Price {
    return {
        buy: db.buy,
        sell: db.sell,
        createdAt: db.created_at,
        buyDifferent: db.buyDifferent,
        sellDifferent: db.sellDifferent,
    };
}
