import { authUser } from "@/actions/auth";
import { getGroupInfo } from "@/actions/group";
import { getActiveSubscription } from "@/actions/payment";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import AboutGroupInfo from "./_components/about-group-info";
import GroupSideWidget from "@/components/global/group-side-widget";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const user = await authUser();
  const { groupId } = await params;
  await query.prefetchQuery({
    queryKey: ["about-group-info"],
    queryFn: async () => {
      return getGroupInfo({ groupId });
    },
  });

  await query.prefetchQuery({
    queryKey: ["active-subscription"],
    queryFn: async () => {
      return getActiveSubscription({ groupId });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="pt-36 pb-10 container grid grid-cols-1 lg:grid-cols-3 gap-x-10">
        <div className="col-span-1 lg:col-span-2">
          <AboutGroupInfo userId={user.id!} groupId={groupId} />
        </div>
        <div className="col-span-1 relative">
          <GroupSideWidget userId={user.id} groupId={groupId} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
