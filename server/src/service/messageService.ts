import { firestore } from "../dal/firebase";

let first = true;

const priceCollection = firestore.collection("price");

export async function pushMessage() {
    priceCollection
        .orderBy("created_at", "desc")
        .limit(1)
        .onSnapshot(async (snapshot) => {
            if (first) {
                first = false;
                return;
            }

            // try {
            //     const data = snapshot.docs[0].data();
            //     const messageNotify = generateMessage(data);

            //     await lineNotify(process.env.NOTIFY_GOLD_PRICE_TRACKING, messageNotify);
            // } catch (err: unknown) {
            //     if (err instanceof Error) {
            //         utils.log("pushMessage failed", LogLevel.error, err);
            //     }
            // }
        });
}
