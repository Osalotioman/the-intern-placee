import { sanitize } from "isomorphic-dompurify";
import { CSSProperties } from "react";

export default function RichTextDisplay({ data }: { data: string }) {
	const sanitizedData = sanitize(data);

	return (
		<div
			dangerouslySetInnerHTML={{ __html: sanitizedData }}
			style={{ "--tw-prose-bold": "text-[#AAAAAA]" } as CSSProperties}
		/>
	);
}
