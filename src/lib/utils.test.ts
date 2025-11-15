import { FirebaseError } from "firebase/app";
import { describe, expect, it } from "vitest";

import {
	cn,
	getUserFriendlyError,
	isErrorInstance,
	sanitizeFileName,
} from "./utils";

describe("utils/cn", () => {
	it("merges class names and resolves conflicts", () => {
		expect(
			cn("px-2 py-2 text-white", false && "hidden", ["px-4", "font-bold"])
		).toBe("py-2 text-white px-4 font-bold");
	});
});

describe("utils/getUserFriendlyError", () => {
	it("returns mapped firebase error message", () => {
		expect(getUserFriendlyError("auth/invalid-credential")).toBe(
			"Invalid credentials provided. Please check your email and password."
		);
	});

	it("falls back to generic message for unknown errors", () => {
		expect(getUserFriendlyError("auth/missing-user")).toBe(
			"An unexpected error occured, please try again later."
		);
	});
});

describe("utils/isErrorInstance", () => {
	it("detects FirebaseError instances", () => {
		const firebaseError = new FirebaseError("auth/invalid-credential", "oops");
		expect(isErrorInstance(firebaseError)).toBe(true);
		expect(isErrorInstance(new Error("generic error"))).toBe(false);
	});
});

describe("utils/sanitizeFileName", () => {
	it("normalizes file names", () => {
		expect(sanitizeFileName("Senior Product Manager CV.pdf")).toBe(
			"senior-product-manager-cv.pdf"
		);
	});
});
