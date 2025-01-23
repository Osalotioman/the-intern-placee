import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { sanitize } from "isomorphic-dompurify";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { Bold, Italic, List, ListOrdered, Redo, Undo } from "lucide-react";

const EditorMenuBar = ({ editor }: { editor: Editor }) => {
	return (
		<div className="bg-background-main-400 text-white p-4">
			<div className="flex items-center gap-2 flex-wrap [&_button]:p-1 hover:[&_button]:bg-background-main-300 hover:[&_button]:text-background-main [&_svg]:hover:[&_button]:stroke-background-main data-[active=true]:[&_button]:bg-background-main-300 data-[active=true]:[&_button]:text-background-main duration-150 transition-all">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					data-active={editor.isActive("bold")}>
					<Bold size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					data-active={editor.isActive("italic")}>
					<Italic size={20} />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					data-active={editor.isActive("heading", { level: 1 })}>
					H1
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					data-active={editor.isActive("heading", { level: 2 })}>
					H2
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					data-active={editor.isActive("heading", { level: 3 })}>
					H3
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					}
					data-active={editor.isActive("heading", { level: 4 })}>
					H4
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 5 }).run()
					}
					data-active={editor.isActive("heading", { level: 5 })}>
					H5
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 6 }).run()
					}
					data-active={editor.isActive("heading", { level: 6 })}>
					H6
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					data-active={editor.isActive("bulletList")}>
					<List size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					data-active={editor.isActive("orderedList")}>
					<ListOrdered size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}>
					<Undo size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}>
					<Redo size={20} />
				</button>
			</div>
		</div>
	);
};

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
	}),
];

export const RichTextEditor = ({
	content = "",
	setValue,
}: {
	setValue: (content: string) => void;
	content?: string;
}) => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					"bg-background-main-400 border-t border-white p-4 min-h-[504px] focus:outline-none tiptap",
			},
		},
		extensions,
		content,
		onUpdate(props) {
			const sanitizedContent = sanitize(props.editor.getHTML());
			setValue(sanitizedContent);
		},
	});

	if (!editor) return null;

	return (
		<div>
			<EditorMenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};
