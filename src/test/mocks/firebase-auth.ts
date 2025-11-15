export class User {}

const defaultAuth = {
	signOut: () => Promise.resolve(),
};

export const getAuth = () => defaultAuth;
export const createUserWithEmailAndPassword = () => Promise.resolve();
export const signInWithEmailAndPassword = () => Promise.resolve();
export const onAuthStateChanged = (
	_auth: typeof defaultAuth,
	callback: (user: User | null) => void
) => {
	callback(null);
	return () => {};
};
