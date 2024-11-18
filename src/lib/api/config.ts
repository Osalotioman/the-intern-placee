import config from "@/config";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {  } from "firebase/firestore"

const firebaseConfig = {
	apiKey: config.API_KEY,
	authDomain: config.AUTH_DOMAIN,
	projectId: config.PROJECT_ID,
	storageBucket: config.STORAGE_BUCKET,
	messagingSenderId: config.MESSAGING_SENDER_ID,
	appId: config.APP_ID,
	measurementId: config.MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
