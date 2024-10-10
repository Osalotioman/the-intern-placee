import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	getAuth,
} from "firebase/auth";
import {app} from '@/lib/api/config'

const auth = getAuth(app);

export async function getCurrentUser() {
	return auth.currentUser
}

export async function signUpWithEmailAndPassword(
	email: string,
	password: string
) {
	return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailAndPassword(
	email: string,
	password: string
) {
	return await firebaseSignInWithEmailAndPassword(auth, email, password);
}

export const signOut = auth.signOut()
