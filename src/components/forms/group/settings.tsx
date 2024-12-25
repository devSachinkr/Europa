"use client";

import GroupCard from "@/app/(discover)/explore/_components/group-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGroupSettings } from "@/hooks/group";
import Image from "next/image";
import React from "react";
import groupPlaceholderIcon from "../../../../public/assets/group_icon.svg";
type Props = {
  groupId: string;
};

const GroupSettingsForm = ({ groupId }: Props) => {
  const {
    onSubmit,
    isPending,
    previewThumbnail,
    previewIcon,
    errors,
    register,
    setDescription,
    setJsonDescription,
    group,
    update,
    jsonDescription,
    description,
  } = useGroupSettings({ groupId });
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col h-full w-full items-start gap-y-5"
    >
      <div className="flex 2xl:flex-row flex-col gap-10">
        <div className="flex flex-col gap-3 items-start">
          <p>Group Preview</p>
          <GroupCard
            id={group?.data?.id as string}
            createdAt={group?.data?.createdAt as Date}
            userId={group?.data?.userId as string}
            category={group?.data?.category as string}
            description={group?.data?.description}
            privacy={group?.data?.privacy as "PRIVATE" | "PUBLIC"}
            thumbnail={group?.data?.thumbnail as string | undefined}
            name={group?.data?.name as string}
            preview={previewThumbnail}
          />
          <Label
            htmlFor="thumbnail-upload"
            className="border-2 border-themeGray bg-themeGray/50 px-5 py-3 rounded-lg hover:bg-themeBlack cursor-pointer"
          >
            <Input
              type="file"
              id="thumbnail-upload"
              className="hidden"
              {...register("thumbnail")}
            />
            Change Cover
          </Label>
        </div>
        <div className="flex-1 flex flex-col gap-3 items-start">
          <p>Icon Preview</p>
        </div>
        <Image
          className="w-20 h-20 rounded-xl"
          src={
            previewIcon ||
            (group?.data?.icon &&
              `https://ucarecdn.com/${group.data.icon as string}`) ||
            groupPlaceholderIcon
          }
          alt="icon"
          width={20}
          height={20}
        />
      </div>
    </form>
  );
};

export default GroupSettingsForm;
