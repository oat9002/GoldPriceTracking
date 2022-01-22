import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

let firebaseApp = null;

export const eventName = {
    screenView: "screen_view",
    click: "click",
};

export function isFirebaseEnable() {
    return process.env.REACT_APP_FIREBASE_ENABLE === "true";
}

export function initializeFirebase() {
    if (!isFirebaseEnable()) {
        return;
    }

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    firebaseApp = initializeApp(firebaseConfig);
}

export function logAnalyticEvent(eventName, eventParams, options) {
    if (!isFirebaseEnable()) {
        return;
    }

    const analytics = getAnalytics(firebaseApp);

    logEvent(analytics, eventName, eventParams, options);
}
