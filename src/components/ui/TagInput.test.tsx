import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TagInput from "./TagInput";

describe("TagInput", () => {
	it("adds tags when confirming via Enter and comma", async () => {
		const user = userEvent.setup();
		const setValue = vi.fn();
		const onChange = vi.fn();

		render(
			<TagInput
				name="skills"
				defaultValue={["react"]}
				setValue={setValue}
				onChange={onChange}
			/>
		);

		const input = screen.getByRole("textbox");
		await user.type(input, "node{enter}");
		await screen.findByText("node");

		await user.type(input, "design,");
		await screen.findByText("design");

		await waitFor(() =>
			expect(setValue).toHaveBeenLastCalledWith("skills", [
				"react",
				"node",
				"design",
			])
		);
		expect(onChange).toHaveBeenCalledTimes(2);
	});

	it("prevents duplicate tags and removes tags via button", async () => {
		const user = userEvent.setup();

		render(<TagInput name="tools" defaultValue={["figma"]} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "figma{enter}");

		expect(screen.getAllByText("figma")).toHaveLength(1);

		const removeButton = screen.getByRole("button", { name: /remove figma/i });
		await user.click(removeButton);

		await waitFor(() =>
			expect(screen.queryByText("figma")).not.toBeInTheDocument()
		);
	});
});
