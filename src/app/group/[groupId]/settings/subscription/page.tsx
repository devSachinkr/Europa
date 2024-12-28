import GroupSubscriptionForm from "@/components/forms/group/subscription";
import GradientText from "@/components/global/gradient-text";
import React from "react";
import Subscriptions from "./_components/subscriptions";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { groupId } = await params;
  return (
    <div className="p-10 flex flex-col gap-y-10">
      <GradientText element="H2" className="font-bold text-3xl">
        {" "}
        Group Subscriptions
      </GradientText>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <GroupSubscriptionForm groupId={groupId} />
        <Subscriptions groupId={groupId} />
      </div>
    </div>
  );
};

export default page;

