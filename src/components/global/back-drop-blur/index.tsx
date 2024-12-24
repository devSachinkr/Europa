import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
    children?: React.ReactNode;
    container?: string;
};

const BackDropGradient = ({ className, children, container }: Props) => {
    return (
        <div className={cn("relative w-full flex flex-col", container)}>
            <div
                className={cn(
                    "absolute rounded-[50%] radial--blur mx-10",
                    className,
                )}
            />
            {children}
        </div>
    );
};

export default BackDropGradient;
