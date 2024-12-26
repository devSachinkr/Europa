import GroupSettingsForm from "@/components/forms/group/settings";
import React from "react";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { groupId } = await params;
  return (
    <div className="flex flex-col w-full h-full gap-10 px-16 py-10 overflow-auto">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold text-gradient">Group Settings</h3>
        <p className=" text-sm text-themeTextGray">
          Here you can manage your group settings.This action might take some
          time to reflect on the{" "}
          <b className="px-[3px] text-gradient">
            <i>PUBLIC</i>
          </b>
          page.
        </p>
      </div>
      <GroupSettingsForm groupId={groupId} />
    </div>
  );
};

export default page;
