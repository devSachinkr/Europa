import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

const GlassCard = ({ className, children }: Props) => {
    return (
        <Card
            className={cn(
                className,
                "rounded-2xl bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-4xl bg-opacity-40 ",
            )}
        >
            {children}
        </Card>
    );
};

export default GlassCard;
