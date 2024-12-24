import {
    Chat,
    Courses,
    Document,
    Fitness,
    Grid,
    Heart,
    LifeStyle,
    MegaPhone,
    Music,
    PersonalDevelopment,
    SocialMedia,
    Tech,
    WhiteLabel,
} from "@/icons";
import { Business } from "@/icons/buisness";
import { RefreshCcw } from "lucide-react";
import React from "react";

export type GroupPlaceholderProps = {
    id: string;
    label: string;
    icon: React.ComponentType;
};
export const GROUP_PLACEHOLDER: GroupPlaceholderProps[] = [
    {
        id: "1",
        label: "Highly engaged",
        icon: MegaPhone,
    },
    {
        id: "2",
        label: "Easy to set up",
        icon: Heart,
    },
    {
        id: "3",
        label: "Group chat and posts",
        icon: Chat,
    },
    {
        id: "4",
        label: "Students can create teams within groups",
        icon: Grid,
    },
    {
        id: "5",
        label: "Gamification",
        icon: Document,
    },

    {
        id: "6",
        label: "Host unlimited courses",
        icon: Courses,
    },

    {
        id: "7",
        label: "white-label options",
        icon: WhiteLabel,
    },
];

export type GROUP_LIST_PROPS = {
    label: string;
    icon: React.ComponentType;
    path: string;
    id: string;
};

export const GROUP_LIST: GROUP_LIST_PROPS[] = [
    {
        label: "All",
        icon: RefreshCcw,
        path: "",
        id: "1",
    },
    {
        label: "Fitness",
        icon: Fitness,
        path: "Fitness",
        id: "2",
    },
    {
        label: "Music",
        icon: Music,
        path: "Music",
        id: "3",
    },
    {
        label: "Business",
        icon: Business,
        path: "Business",
        id: "4",
    },
    {
        label: "LifeStyle",
        icon: LifeStyle,
        path: "LifeStyle",
        id: "5",
    },
    {
        label: "Personal Development",
        icon: PersonalDevelopment,
        path: "personal-development",
        id: "6",
    },
    {
        label: "Social Media",
        icon: SocialMedia,
        path: "social-media",
        id: "7",
    },
    {
        label: "Tech",
        icon: Tech,
        path: "Tech",
        id: "8",
    },
];
