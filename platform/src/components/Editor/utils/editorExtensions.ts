import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

export const extensions = [
	StarterKit,
	Underline,
	Link,
	TextStyle,
	Superscript,
	SubScript,
	Highlight,
	CharacterCount,
	Color as any,
	TextAlign.configure({ types: ["heading", "paragraph"] }),
];
