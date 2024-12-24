"use client";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    icon: React.ComponentType;
    label: string;
    selected?: string;
};

const GroupListItem = ({ icon: Icon, label, selected }: Props) => {
    return (
        <div
            className={cn(
                "flex items-center gap-3 py-2 px-4 rounded-2xl bg-themeGray border-2 cursor-pointer ",
                selected === label
                    ? "border-x-themeTextGray"
                    : "border-themeGray",
            )}
        >
            <Icon />
            {label}
        </div>
    );
};

export default GroupListItem;
