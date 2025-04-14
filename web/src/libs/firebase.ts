import { Analytics, AnalyticsCallOptions, getAnalytics, logEvent } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let firebaseApp: FirebaseApp = null;
let firestore: Firestore = null;
let analyticsApp: Analytics = null;

export const eventName = {
    screenView: "screen_view",
    click: "click",
};

export function isFirebaseEnable() {
    return import.meta.env.VITE_FIREBASE_ENABLE;
}

async function initializeFirebase() {
    if (!isFirebaseEnable()) {
        return;
    }

    if (firebaseApp) {
        return firebaseApp;
    }

    console.log("Firebase is initializing");

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    firebaseApp = initializeApp(firebaseConfig);
    await authenticate(firebaseApp);
}

export async function getAnalyticsApp() {
    if (!firebaseApp) {
        await initializeFirebase();
    }

    if (!analyticsApp) {
        analyticsApp = getAnalytics(firebaseApp);
    }

    return analyticsApp;
}

export async function getDb() {
    if (!firebaseApp) {
        await initializeFirebase();
    }

    if (!firestore) {
        firestore = getFirestore(firebaseApp);
    }

    console.log("Firestore is initialized");

    return firestore;
}

export async function logAnalyticEvent(
    eventName: string,
    eventParams: { [key: string]: any },
    options: AnalyticsCallOptions = null
) {
    if (!isFirebaseEnable()) {
        return;
    }

    const analytics = await getAnalyticsApp();

    logEvent(analytics, eventName, eventParams, options);
}

async function authenticate(app: FirebaseApp) {
    if (!isFirebaseEnable()) {
        return;
    }

    const auth = getAuth(app);

    if (auth.currentUser) {
        return;
    }

    await signInWithEmailAndPassword(
        auth,
        import.meta.env.VITE_FIREBASE_USERNAME,
        import.meta.env.VITE_FIREBASE_PASSWORD
    );
}
