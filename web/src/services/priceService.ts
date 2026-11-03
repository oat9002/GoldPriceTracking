import { getRangeStart } from "../util/PriceRange";
import { orderBy, query, Timestamp, where } from "firebase/firestore";
import { getDb } from "../libs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Price } from "../models/model";

export async function getPricesLastByDay(days: number): Promise<Price[]> {
    const now = Date.now();
    const end = Timestamp.fromMillis(now);
    const start = Timestamp.fromMillis(getRangeStart(days, now));
    let idx = 0;

    try {
        const db = await getDb();
        const priceCollection = collection(db, "price");
        const q = query(
            priceCollection,
            where("created_at", ">=", start),
            where("created_at", "<=", end),
            orderBy("created_at", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        const priceArr: Price[] = new Array(snapshot.docs.length);

        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.data();
            priceArr[idx++] = {
                buy: data.buy,
                sell: data.sell,
                createdAt: data.created_at.toMillis(),
                buyDifferent: data.buyDifferent,
                sellDifferent: data.sellDifferent,
            };
        });

        return priceArr;
    } catch (err) {
        console.error("Error fetching prices:", err);
        throw err;
    }
}
