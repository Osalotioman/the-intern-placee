import { app } from "@/lib/api/config";
import {
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	getAuth,
	setPersistence,
	User,
} from "firebase/auth";

const auth = getAuth(app);

export async function getCurrentUser() {
	let user: User | null = null;

	auth.onAuthStateChanged((userState) => {
		if (userState) {
			user = userState;
		}
	});

	return user;
}

export async function signUpWithEmailAndPassword(
	email: string,
	password: string
) {
	await setPersistence(auth, browserLocalPersistence);
	return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailAndPassword(
	email: string,
	password: string
) {
	await setPersistence(auth, browserLocalPersistence);
	return await firebaseSignInWithEmailAndPassword(auth, email, password);
}

export const signOut = auth.signOut();
