import {
  AffiliateDuoToneBlack,
  Buisness,
  Chat,
  Courses,
  CreditCard,
  Document,
  Fitness,
  GlobeDuoToneBlack,
  Grid,
  Heart,
  Home,
  IDuotoneBlack,
  LifeStyle,
  MegaPhone,
  Music,
  PersonalDevelopment,
  SocialMedia,
  Tech,
  WhiteLabel,
  ZapDouToneBlack,
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

export type SIDEBAR_SETTINGS_MENU_PROPS = {
  id: number;
  label: string;
  icon: React.ComponentType;
  path: string;
};

export type MENU_PROPS = {
  id: number;
  label: string;
  icon: React.ComponentType;
  path: string;
  section?: boolean;
  integration?: boolean;
};

export const SIDEBAR_SETTINGS_MENU: MENU_PROPS[] = [
  {
    id: 0,
    label: "General",
    icon: IDuotoneBlack,
    path: "",
  },
  {
    id: 1,
    label: "Subscription",
    icon: CreditCard,
    path: "subscription",
  },
  {
    id: 2,
    label: "Affiliates",
    icon: AffiliateDuoToneBlack,
    path: "affiliates",
  },
  {
    id: 3,
    label: "Domain Config",
    icon: GlobeDuoToneBlack,
    path: "domains",
  },
  {
    id: 4,
    label: "Integration",
    icon: ZapDouToneBlack,
    path: "integrations",
    integration: true,
  },
];

export type GROUP_PAGE_MENU_PROPS = {
  id: number;
  label: string;
  icon: React.ComponentType;
  path: string;
  section?: boolean;
  integration?: boolean;
};

export const GROUP_PAGE_MENU: GROUP_PAGE_MENU_PROPS[] = [
  {
    id: 0,
    label: "Group",
    icon: Home,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Courses",
    icon: Courses,
    path: "#pricing",
    section: true,
  },
  {
    id: 2,
    label: "Events",
    icon: Buisness,
    path: "/explore",
  },
  {
    id: 3,
    label: "Members",
    icon: PersonalDevelopment,
    path: "/explore",
  },
  {
    id: 4,
    label: "About",
    icon: Document,
    path: "/explore",
  },
  {
    id: 5,
    label: "Huddle",
    icon: Chat,
    path: "/explore",
  },
];

export type INTEGRATION_LIST_PROPS = {
  id: string;
  name: "Stripe";
  description: string;
  logo: string;
  modalDescription: string;
  title: string;
};
export const INTEGRATION_LIST: INTEGRATION_LIST_PROPS[] = [
  {
    id: "1",
    name: "Stripe",
    description:
      "Payment Integration | Stripe is a payment processing platform that allows you to accept a wide range of payment methods, including credit cards, debit cards, and digital wallets.",
    logo: "914be637-39bf-47e6-bb81-37b553163945",
    modalDescription:
      "The world's most popular payment gateway and successfull payment processor and marketplaces including Shand DoorDash, use Stripe to accept payments from customers all over the world.",
    title: "Connect with Stripe",
  },
];
