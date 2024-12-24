import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
    element?: "H1" | "H2";
    children?: React.ReactNode;
};

const GradientText = ({ className, element, children }: Props) => {
    switch (element) {
        case "H1":
            return (
                <h1 className={cn(className, "text-gradient")}>{children}</h1>
            );
        case "H2":
            return (
                <h2 className={cn(className, "text-gradient")}>{children}</h2>
            );
        default:
            return (
                <h1 className={cn(className, "text-gradient")}>{children}</h1>
            );
    }
};

export default GradientText;
