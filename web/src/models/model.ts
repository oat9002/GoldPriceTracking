export interface Price {
    buy: number;
    sell: number;
    createdAt: number;
    buyDifferent: number;
    sellDifferent: number;
}

export interface Notification {
    message: string;
    severity: string;
}
