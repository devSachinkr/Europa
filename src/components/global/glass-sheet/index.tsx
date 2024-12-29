import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
type Props = {
    children: React.ReactNode;
    trigger: React.ReactNode;
    className?: string;
    triggerClassName?: string;
};

const GlassSheet = ({
    children,
    trigger,
    className,
    triggerClassName,
}: Props) => {
    return (
        <Sheet>
            <SheetTrigger className={cn(triggerClassName)}>
                {trigger}
            </SheetTrigger>
            <SheetContent
                className={cn(
                    "bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl bg-opacity-20 bg-themeGray border-themeGray",
                    className,
                )}
            >
                <VisuallyHidden asChild>
                    <SheetTitle></SheetTitle>
                </VisuallyHidden>

                {children}
            </SheetContent>
        </Sheet>
    );
};

export default GlassSheet;
