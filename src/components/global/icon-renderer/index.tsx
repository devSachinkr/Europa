import {
    FileDuoToneBlack,
    FileDuoToneWhite,
    Home,
    HomeDuoToneWhite,
    MegaPhoneDuoToneBlack,
    MegaPhoneDuoToneWhite,
} from "@/icons";
import React from "react";

type Props = {
    icon: string;
    mode: "LIGHT" | "DARK";
};

export const IconRenderer = ({ icon, mode }: Props) => {
    switch (icon) {
        case "general": {
            return mode === "DARK" ? <Home /> : <HomeDuoToneWhite />;
        }
        case "announcement": {
            return mode === "DARK" ? (
                <MegaPhoneDuoToneBlack />
            ) : (
                <MegaPhoneDuoToneWhite />
            );
        }

        case "doc": {
            return mode === "DARK" ? (
                <FileDuoToneBlack />
            ) : (
                <FileDuoToneWhite />
            );
        }
        default: {
            return <></>;
        }
    }
};
