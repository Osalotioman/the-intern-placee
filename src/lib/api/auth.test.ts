import type { User, UserCredential } from "firebase/auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
	mockCreateUserWithEmailAndPassword,
	mockSignInWithEmailAndPassword,
	mockOnAuthStateChanged,
	mockAuthInstance,
	mockGetAuth,
} = vi.hoisted(() => {
	const mockAuthInstance = {
		signOut: vi.fn(),
	};
	return {
		mockCreateUserWithEmailAndPassword: vi.fn(),
		mockSignInWithEmailAndPassword: vi.fn(),
		mockOnAuthStateChanged: vi.fn(),
		mockAuthInstance,
		mockGetAuth: vi.fn(() => mockAuthInstance),
	};
});

vi.mock("@/lib/api/config", () => ({
	app: {},
}));

vi.mock("firebase/auth", () => ({
	getAuth: mockGetAuth,
	createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
	signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
	onAuthStateChanged: (...args: Parameters<typeof mockOnAuthStateChanged>) =>
		mockOnAuthStateChanged(...args),
	User: class {},
}));

import {
	setCurrentUserOnAuthStateChange,
	signInWithEmailAndPassword as signIn,
	signOut,
	signUpWithEmailAndPassword,
} from "./auth";

describe("lib/api/auth", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockAuthInstance.signOut.mockClear();
	});

	it("registers auth state changes and forwards the user", async () => {
		const listener = vi.fn();
		mockOnAuthStateChanged.mockImplementation((_auth, cb) => {
			cb({ uid: "user-1" } as unknown as User);
			return () => {};
		});

		await setCurrentUserOnAuthStateChange(listener);

		expect(mockOnAuthStateChanged).toHaveBeenCalledWith(
			mockAuthInstance,
			expect.any(Function)
		);
		expect(listener).toHaveBeenCalledWith({ uid: "user-1" });
	});

	it("creates an account with the firebase auth instance", async () => {
		const credential = { user: { uid: "user-2" } } as unknown as UserCredential;
		mockCreateUserWithEmailAndPassword.mockResolvedValueOnce(credential);

		await signUpWithEmailAndPassword("hello@example.com", "pass1234");

		expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
			mockAuthInstance,
			"hello@example.com",
			"pass1234"
		);
	});

	it("signs in with email and password", async () => {
		const credential = { user: { uid: "user-3" } } as unknown as UserCredential;
		mockSignInWithEmailAndPassword.mockResolvedValueOnce(credential);

		await signIn("user@example.com", "pass");

		expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
			mockAuthInstance,
			"user@example.com",
			"pass"
		);
	});

	it("signs out the cached auth instance", async () => {
		await signOut();
		expect(mockAuthInstance.signOut).toHaveBeenCalled();
	});
});
