import { sanitize } from "isomorphic-dompurify";

export default function RichTextDisplay({ data }: { data: string }) {
	const sanitizedData = sanitize(data);

	return (
		<div
			dangerouslySetInnerHTML={{ __html: sanitizedData }}
			style={{ "--tw-prose-bold": "text-[#AAAAAA]" }}
		/>
	);
}
