import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export const Image = Node.create({
  name: "image",
  group: "block",
  draggable: true,
  atom: true,
  selectable: true,
  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ({ editor, node }) => {
      const div = document.createElement("div");
      div.className =
        "w-full" +
        (editor.isEditable ? "cursor-pointer" : " cursor-not-allowed");

      const img = document.createElement("img");
      img.className = "aspect-video w-full";
      img.src = node.attrs.src;
      img.alt = node.attrs.alt;
      img.contentEditable = "false";
      div.appendChild(img);
      return {
        dom: div,
      };
    };
  }
});
