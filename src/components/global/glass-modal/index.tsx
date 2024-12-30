import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

type Props = {
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const GlassModal = ({ title, description, trigger, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-80 bg-themeGray border-themeGray overflow-y-auto max-h-[100vh] hide-scrollbar p-5">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default GlassModal;
