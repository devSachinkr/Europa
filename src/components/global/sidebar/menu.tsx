"use client";
import React from "react";
import { ChannelsInfoType } from ".";
import { usePathname } from "next/navigation";
import { useChannel } from "@/hooks/channel";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import IconDropdown from "./icon-drop-down";
import { IconRenderer } from "../icon-renderer";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

type Props = {
  channels: ChannelsInfoType[];
  groupId: string;
  userId: string;
  optimisticChannel:
    | {
        id: string;
        name: string;
        icon: string;
        createdAt: Date;
        groupId: string|null;
      }
    | undefined;
  loading: boolean;
  groupUserId: string;
};

const SidebarMenu = ({
  channels,
  groupId,
  userId,
  groupUserId,
}: Props) => {
  const pathname = usePathname();
  const channelPage = pathname.split("/").pop();
  const {
    channelRef,
    inputRef,
    triggerRef,
    channel,
    edit,
    icon,
    onEditChannel,
    onSetIcon,
    isPending,
    variables,
    deleteMutationChannel,
    deleteChannelVariables,
  } = useChannel();
  if (pathname.includes("settings"))
    return (
      <div className="flex flex-col">
        {EUROPA_CONSTANTS.sidebarSettingsMenu.map((item) =>
          item.integration ? (
            userId === groupUserId && (
              <Link
                className={cn(
                  "flex gap-x-2 items-center font-semibold rounded-xl text-themeTextGray hover:bg-themeGray p-2",
                  channelPage === item.path && "text-white",
                )}
                href={`/group/${groupId}/settings/${item.path}`}
                key={item.path}
              >
                <item.icon />
                {item.label}
              </Link>
            )
          ) : (
            <Link
              className={cn(
                "flex gap-x-2 items-center font-semibold rounded-xl text-themeTextGray hover:bg-themeGray p-2",
                channelPage === "settings"
                  ? !item.path && "text-white"
                  : channelPage === item.path && "text-white",
              )}
              href={`/group/${groupId}/settings/${item.path}`}
              key={item.path}
            >
              <item.icon />
              {item.label}
            </Link>
          ),
        )}
      </div>
    );
  
    return (
      <div className="flex flex-col">
        {channels && channels.length > 0 ? (
          <>
            {channels.map(
              (ch) =>
                ch.id !== deleteChannelVariables?.id && (
                  <Link
                    id="channel-link"
                    key={ch.id}
                    className={cn(
                      "flex justify-between hover:bg-themeGray p-2 group rounded-lg items-center",
                      ch.id === channel && edit && "bg-themeGray",
                    )}
                    href={`/group/${ch.groupId}/channel/${ch.id}`}
                    {...(ch.name !== "general" &&
                      ch.name !== "announcements" && {
                        onDoubleClick: () => onEditChannel({id:ch.id}),
                        ref: channelRef,
                      })}
                  >
                    <div className="flex gap-x-2 items-center">
                      {ch.id === channel && edit ? (
                        <IconDropdown
                          ref={triggerRef}
                          page={channelPage}
                          onSetIcon={onSetIcon}
                          channelId={ch.id}
                          icon={ch.icon}
                          currentIcon={icon}
                        />
                      ) : (
                        <IconRenderer
                          icon={ch.icon}
                          mode={channelPage === ch.id ? "LIGHT" : "DARK"}
                        />
                      )}
                      {ch.id === channel && edit ? (
                        <Input
                          type="text"
                          ref={inputRef}
                          className="bg-transparent p-0 text-lg m-0 h-full"
                        />
                      ) : (
                        <p
                          className={cn(
                            "text-lg capitalize",
                            channelPage === ch.id
                              ? "text-white"
                              : "text-themeTextGray",
                          )}
                        >
                       
                          {isPending && variables && channel === ch.id
                            ? variables.name
                            : ch.name}
                           
                        </p>
                      )}
                    </div>
                    {ch.name.toLowerCase() !== "general" &&
                      ch.name.toLowerCase() !== "announcements" &&
                      userId === groupUserId && (
                        <Trash
                          onClick={() => deleteMutationChannel({id:ch.id})}
                          className="group-hover:inline hidden content-end text-themeTextGray hover:text-gray-400"
                          size={16}
                        />
                      )}
                  </Link>
                ),
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    )
};

export default SidebarMenu;
