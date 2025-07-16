"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Toggle } from "@radix-ui/react-toggle";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  ListOrdered,
  List,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

const TiptapEditor: React.FC<Props> = ({ content, onChange }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc dark:prose-invert min-h-[30vh] max-w-full bg-zinc-800 p-4 rounded-lg text-white focus:outline-none",
      },
    },
    onUpdate: ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
      if (editor) {
        onChange(editor.getHTML());
      }
    },
    autofocus: false,
    editable: true,
    injectCSS: true,
    parseOptions: {},
    immediatelyRender: false, 
  });

  if (!mounted || !editor) return null;

  const headingLevels: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

  interface ButtonProps {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
  }

  const Button: React.FC<ButtonProps> = ({ onClick, isActive, children }) => (
    <Toggle
      pressed={isActive}
      onPressedChange={onClick}
      className={`rounded-md p-2 hover:bg-zinc-700 transition-all ${
        isActive ? "bg-zinc-700" : "bg-zinc-900"
      }`}
    >
      {children}
    </Toggle>
  );

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-2 bg-zinc-900 p-2 rounded-md">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon size={16} />
        </Button>

        {headingLevels.map((level) => (
          <Button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            isActive={editor.isActive("heading", { level })}
          >
            {React.createElement(
              [Heading1, Heading2, Heading3, Heading4, Heading5][level - 1],
              { size: 16 }
            )}
          </Button>
        ))}

        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          onClick={() => {
            const url = prompt("Enter a URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          isActive={editor.isActive("link")}
        >
          <LinkIcon size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight size={16} />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
