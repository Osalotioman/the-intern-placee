export class FirebaseError extends Error {
	code: string;

	constructor(code: string, message: string) {
		super(message);
		this.name = "FirebaseError";
		this.code = code;
	}
}

export const initializeApp = () => ({});
