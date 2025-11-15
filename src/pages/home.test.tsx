import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Home from "./home";

vi.mock("@/hooks/useUser", () => ({
	useUser: () => ({ user: null }),
}));

vi.mock("@/components/PostJob", () => ({
	PostJob: ({ trigger }: { trigger: React.ReactNode }) => (
		<>
			{trigger}
			<div data-testid="post-job-modal" />
		</>
	),
}));

vi.mock("@/components/JobDetailsBriefCard", () => ({
	JobDetailsBriefCard: () => <div data-testid="job-brief-card">Brief</div>,
}));

vi.mock("@/components/ApplyToJob", () => {
	const ApplyToJob = ({ trigger }: { trigger: React.ReactNode }) => (
		<>{trigger}</>
	);
	ApplyToJob.Provider = ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	);
	ApplyToJob.Trigger = ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	);
	ApplyToJob.Content = () => null;
	return { ApplyToJob };
});

vi.mock("@/components/ui/Sidebar", () => ({
	default: () => <nav aria-label="sidebar" />,
}));

vi.mock("@/components/ui/ActivityPanel", () => ({
	ActivityPanel: () => <aside aria-label="activity-panel" />,
}));

describe("pages/Home", () => {
	const renderHome = () =>
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

	it("renders the primary dashboard sections", () => {
		renderHome();

		expect(screen.getByText(/recommended for you/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Jobs where you are a top applicant/i)
		).toBeInTheDocument();
		expect(screen.getAllByTestId("job-brief-card")).toHaveLength(4);
		expect(screen.getByRole("button", { name: /post a job/i })).toBeEnabled();
	});

	it("allows users to dismiss the hero banner", async () => {
		const user = userEvent.setup();
		renderHome();

		const closeButton = screen.getByRole("button", {
			name: /dismiss welcome banner/i,
		});
		await user.click(closeButton);

		expect(screen.queryByText(/mykola/i)).not.toBeInTheDocument();
	});
});
