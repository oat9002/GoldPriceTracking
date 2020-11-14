export interface Price {
    buy: number;
    sell: number;
    createdAt: Date;
}

export function mapPriceFromDb(db: any): Price {
    return {
        buy: db.buy,
        sell: db.sell,
        createdAt: db.created_at,
    };
}
