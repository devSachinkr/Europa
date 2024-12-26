/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { useGroupChat } from "@/hooks/chat";
import { useSidebar } from "@/hooks/sidebar";
import { CarotSort } from "@/icons";
import { cn } from "@/lib/utils";
import { Group, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";
import groupPlaceholderIcon from "../../../../public/assets/group_icon.svg";
import Dropdown from "../drop-down";
import SidebarMenu from "./menu";
type Props = {
  groupId: string;
  userId: string;
  mobile?: boolean;
};
export interface GroupInfoType {
  status: number;
  data:
    | {
        id: string;
        name: string;
        category: string;
        thumbnail: string | null;
        description: string | null;
        gallery: string[];
        jsonDescription: string | null;
        htmlDescription: string | null;
        privacy: boolean;
        active: boolean;
        createdAt: Date;
        userId: string;
        icon: string;
      }
    | undefined;
}

export interface ChannelsInfoType {
  id: string;
  name: string;
  createdAt: Date;
  groupId: string | null;
  icon: string;
}

export interface IGroups {
  status: number;
  data: {
    groups:
      | [
          {
            icon: string | null;
            id: string;
            name: string;
          },
        ]
      | undefined;
  };
}

const Sidebar = ({ groupId, userId, mobile }: Props) => {
  const { isPending, channels, groups, groupInfo, mutate, variables } =
    useSidebar({ groupId });
  useGroupChat({ userId });
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "h-screen flex flex-col gap-y-10 sm:px-5",
        !mobile ? "hidden bg-black md:mw-[300px] fixed md:flex" : "w-full flex",
      )}
    >
      {groups.data && groups.data.groups?.length && (
        <Dropdown
          title="Gropus"
          trigger={
            <div className="w-full flex items-center justify-between text-themeTextGray md:border-[1px] border-themeGray py-3 rounded-xl p-2">
              <div className="flex gap-x-3 items-center">
                <img
                  src={
                    groupInfo.data?.icon
                      ? `https://ucarecdn.com/${groupInfo.data?.icon}/`
                      : groupPlaceholderIcon.src
                  }
                  alt="icon"
                  className="w-10 rounded-lg"
                  width={40}
                  height={40}
                />
                <p className="text-sm">{groupInfo.data?.name}</p>
              </div>
              <span>
                <CarotSort />
              </span>
            </div>
          }
        >
          {groups.data &&
            groups.data.groups.length &&
            groups.data.groups.map(
              (group) =>
                group.id === groupId && (
                  <Link
                    key={group.id}
                    href={`/group/${group.id}/channel/${channels?.data?.[0].id}`}
                    className="flex items-center gap-x-3 py-2"
                  >
                    <Button
                      variant={"ghost"}
                      className="flex gap-2 w-full justify-start hover:bg-themeGray items-center "
                    >
                      <Group />
                      {group.name}
                    </Button>
                  </Link>
                ),
            )}
        </Dropdown>
      )}
      <div className="flex flex-col gap-y-5">
        {!pathname.includes("settings") && (
          <div className="flex justify-between items-center">
            <p className="text-xs text-[#F7ECE9]">CHANNELS</p>
            {userId === groupInfo.data?.userId && (
              <PlusCircle
                size={16}
                className={cn(
                  "text-themeTextGray cursor-pointer",
                  isPending && "opacity-70",
                )}
                {...(!isPending && {
                  onClick: () =>
                    mutate({
                      id: v4(),
                      name: "unnamed",
                      icon: "general",
                      createdAt: new Date(),
                      groupId,
                    }),
                })}
              />
            )}
          </div>
        )}
        <SidebarMenu
          channels={channels?.data || []}
          groupId={groupId}
          userId={userId}
          optimisticChannel={variables}
          loading={isPending}
          groupUserId={groupInfo.data?.userId as string}
        />
      </div>
    </div>
  );
};

export default Sidebar;
