"use client";
import { useEnrolledGroups } from "@/hooks/group";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GroupIconPlaceholder from "../../../../public/assets/group_icon.svg";
import { OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";
type Props = {
  groupId: string;
};

const EnrolledGroups = ({ groupId }: Props) => {
  const { enrolledGroupsInfo, pathname } = useEnrolledGroups({ groupId });
  if (!enrolledGroupsInfo.length) {
    return (
      <Link
        href={"/explore"}
        className="flex text-sm text-muted-foreground flex-col gap-3 items-center mt-3 w-full hover:bg-themeGray p-2 rounded-xl group"
        suppressHydrationWarning
      >
        <OctagonAlert size={20} className="text-yellow-400"/>
        No Enrolled Groups,
        <span className="text-sm mt-2 group-hover:underline text-gradient">
          Explore Groups
        </span>
      </Link>
    );
  }
  return enrolledGroupsInfo.map((group) => (
    <Link
      key={group.id}
      href={`/group/${group.id}`}
      className={cn(
        "flex text-sm text-muted-foreground gap-3 items-center mt-3 w-full hover:bg-themeGray p-2 rounded-xl",
        pathname.includes(`/group/${group.id}`) && "bg-themeGray",
      )}
      suppressHydrationWarning
    >
      <Image
        src={
          group.icon?.length
            ? `https://ucarecdn.com/${group.icon}/`
            : GroupIconPlaceholder.src
        }
        alt="icon"
        width={40}
        height={40}
        className="rounded-full"
      />
      {group.name}
    </Link>
  ));
};

export default EnrolledGroups;
