import { upload } from "@/lib/upload-card";
import {
    CheckSquareIcon,
    Code,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    List,
    ListOrdered,
    MessageSquarePlus,
    Text,
    TextQuote,
    VideoIcon
} from "lucide-react";
import { Command, createSuggestionItems, renderItems } from "novel/extensions";

export const suggestionItems = createSuggestionItems([
  {
    title: "Send Feedback",
    description: "Let us know what you think",
    icon: <MessageSquarePlus size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      window.open("/feedback", "_blank");
    },
  },
  {
    title: "Text",
    description: "Insert a text",
    icon: <Text size={18} />,
    searchTerms: ["p", "paragraph"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-Do List",
    description: "Insert a to-do list",
    icon: <CheckSquareIcon size={18} />,
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Image",
    description: "Insert an image",
    searchTerms: ["image", "picture", "photo", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          const uploaded = await upload.uploadFile(file);
          const url = `https://ucarecdn.com/${uploaded.uuid}`;
          if (url) {
            editor.commands.insertContent([
              {
                type: "image",
                attrs: {
                  src: url,
                  alt: file.name,
                },
              },
            ]);
          }
        }
      };
      input.click();
    },
  },

  {
    title: "Video",
    description: "Insert a video",
    searchTerms: ["video", "media"],
    icon: <VideoIcon size={18} />,
    command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        const videoSrc = prompt("Enter the video URL");
        if (videoSrc) {
            editor.commands.insertContent([
                {
                    type: "video",
                    attrs: {
                        src: videoSrc,
                        alt: "video",
                    },
                },
            ]);
        }
    },
  },
]);

export const slashCommand = Command.configure({
    suggestion:{
        items:()=> suggestionItems,
        render:renderItems
    }
});