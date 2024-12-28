/* eslint-disable @next/next/no-img-element */
"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGroupInfo } from "@/hooks/group";
import { cn } from "@/lib/utils";
import React from "react";
import JoinGroupButton from "./join-group-button";

type Props = {
  userId?: string;
  groupId?: string;
  light?: boolean;
};

const GroupSideWidget = ({ userId, groupId, light }: Props) => {
  const { group } = useGroupInfo();
  return (
    <Card
      className={cn(
        "border-themeGray lg:sticky lg:top-0 mt-10 lg:mt-0 rounded-xl overflow-hidden",
        light ? " border-themeGray bg-[#1A1A1D]" : "bg-themeBlack",
      )}
    >
      <img
        src={`https://ucarecdn.com/${group.thumbnail}/`}
        alt="group-thumbnail"
        className="w-full aspect-video"
      />
      <div className="flex flex-col p-5 gap-y-2">
        <h2 className="font-bold text-lg">{group.name}</h2>
        <p className="text-sm text-themeTextGray">{group.description}</p>
      </div>
      <Separator orientation="horizontal" className="bg-themeGray" />
      {groupId && (
        <JoinGroupButton groupId={groupId} owner={group.userId === userId} />
      )}
    </Card>
  );
};

export default GroupSideWidget;
