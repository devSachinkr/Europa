import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import EuropaLogo from "../../../../public/assets/group_icon.svg";
type SimpleModalProps = {
  trigger: JSX.Element;
  children: React.ReactNode;
  title?: string;
  description?: string;
  type?: "Integration";
  logo?: string;
};

export const SimpleModal = ({
  trigger,
  children,
  type,
  title,
  logo,
  description,
}: SimpleModalProps) => {
  switch (type) {
    case "Integration":
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="bg-themeBlack border-themeDarkGray overflow-hidden overflow-y-scroll !max-w-2xl border-themeGray hide-scrollbar ">
            <VisuallyHidden asChild>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
            <div className="flex justify-center gap-3 ">
              <div className="w-12 h-12 relative">
                <Image src={EuropaLogo} width={60} height={60} alt="Europa" />
              </div>
              <div className="text-gray-400">
                <ArrowLeft size={20} />
                <ArrowRight size={20} />
              </div>
              <div className="w-12 h-12 relative">
                <Image src={logo || ""} width={60} height={60} alt="Stripe" />
              </div>
            </div>
            <DialogHeader className="flex items-center">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className=" text-center">
                {description}
              </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
    default:
      return (
        <Dialog>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent
            className="bg-[#1C1C1E] overflow-hidden overflow-y-scroll !max-w-2xl border-themeGray hide-scrollbar "
            aria-describedby={undefined}
          >
            <VisuallyHidden asChild>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
            {children}
          </DialogContent>
        </Dialog>
      );
  }
};
