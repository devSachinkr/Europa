'use client'
import ToastNotify from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";

type Props = {
  content: string;
};

const CopyButton = ({ content }: Props) => {
  return (
    <Button
      className="bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold py-2 px-4 rounded-full gap-x-3 mb-3"
      onClick={() => {
        navigator.clipboard.writeText(content);
        return ToastNotify({
          title: "Success",
          msg: "Link Copied",
        });
      }}
    >
      <Copy size={20} />
      Copy Link
    </Button>
  );
};

export default CopyButton;
