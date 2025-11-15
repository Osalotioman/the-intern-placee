import { FirebaseError } from "firebase/app";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import useJobdetails from "./useJobdetails";

const mockGetJob = vi.fn();

vi.mock("@/lib/api/db", () => ({
	getJob: (...args: Parameters<typeof mockGetJob>) => mockGetJob(...args),
}));

describe("hooks/useJobdetails", () => {
	afterEach(() => {
		mockGetJob.mockReset();
	});

	it("remains idle when no job id is provided", () => {
		const { result } = renderHook(() => useJobdetails(undefined));
		expect(result.current.status).toBe("idle");
		expect(mockGetJob).not.toHaveBeenCalled();
	});

	it("fetches job data and resolves with success state", async () => {
		const job = { id: "1", position: "Designer" };
		mockGetJob.mockResolvedValueOnce(job);

		const { result } = renderHook(() => useJobdetails("1"));

		await waitFor(() => {
			expect(result.current.status).toBe("success");
		});

		expect(result.current.data).toEqual(job);
		expect(mockGetJob).toHaveBeenCalledWith("1");
	});

	it("stores firebase errors when the fetch fails", async () => {
		const firebaseError = new FirebaseError("not-found", "missing");
		mockGetJob.mockRejectedValueOnce(firebaseError);

		const { result } = renderHook(() => useJobdetails("does-not-exist"));

		await waitFor(() => {
			expect(result.current.status).toBe("error");
		});

		expect(result.current.error).toBe(firebaseError);
	});
});
