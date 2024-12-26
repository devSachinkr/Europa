/* eslint-disable @next/next/no-img-element */
"use client";

import GroupCard from "@/app/(discover)/explore/_components/group-card";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import BlockTextEditor from "@/components/global/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGroupSettings } from "@/hooks/group";
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
          <img
            className="w-20 h-20 rounded-xl"
            src={
              previewIcon ||
              (group?.data?.icon &&
                `https://ucarecdn.com/${group.data.icon as string}/`) ||
              groupPlaceholderIcon.src
            }
            alt="icon"
            width={20}
            height={20}
          />
          <Label
            htmlFor="icon-upload"
            className="border-2 border-themeGray bg-themeGray/50 px-5 py-3 rounded-lg hover:bg-themeBlack cursor-pointer"
          >
            <Input
              type="file"
              id="icon-upload"
              className="hidden"
              {...register("icon")}
            />
            Change Icon
          </Label>
        </div>
      </div>
      <div className=" mb-6 flex flex-col ww-full xl:w-8/12 2xl:w-7/12 gap-y-5">
        <FormGenerator
          register={register}
          name="name"
          label="Group Name"
          placeholder={group?.data?.name || "Group Name"}
          errors={errors}
          inputType="input"
          type="text"
        />
        <Label className="flex flex-col gap-y-2 mb-6">
          <p>Group Description</p>
          <BlockTextEditor
            name="jsondescription"
            errors={errors}
            min={150}
            max={10000}
            textContent={description}
            content={jsonDescription!}
            setContent={setJsonDescription!}
            setTextContent={setDescription}
          />
        </Label>
        <Button
          type="submit"
          className="bg-demonGreen hover:bg-demonGreen/80 text-white font-bold py-2 px-4 rounded-md mb-6"
        >
          <Loader loading={isPending}>Save Changes</Loader>
        </Button>
      </div>
    </form>
  );
};

export default GroupSettingsForm;
