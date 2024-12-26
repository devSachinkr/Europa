import { mergeAttributes, Node } from "@tiptap/core";

export const Video = Node.create({
  name: "video",
  group: "block",
  draggable: true,
  atom: true,
  selectable: true,
  parseHTML() {
    return [
      {
        tag: "video",
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
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ({ editor, node }) => {
      const div = document.createElement("div");
      div.className =
        "aspect-video" +
        (editor.isEditable ? "cursor-pointer" : " cursor-not-allowed");

      const iframe = document.createElement("iframe");
      iframe.src = node.attrs.src;
      iframe.title = node.attrs.alt;
      iframe.contentEditable = "false";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.allowFullscreen = true;
      div.appendChild(iframe);
      return {
        dom: div,
      };
    };
  },
});
