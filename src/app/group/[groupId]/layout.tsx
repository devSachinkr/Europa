import { authUser } from "@/actions/auth";
import {
  getGroupInfo,
  getGroupsChannels,
  getGroupSubscription,
  getMemberChat,
  getUserGroups,
} from "@/actions/group";
import Sidebar from "@/components/global/sidebar";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/navbar";

type Props = Promise<{
  children: React.ReactNode;
  params: { groupId: string };
}>;

const layout = async (props: Props) => {
  const {
    children,
    params: { groupId },
  } = await props;
  const user = await authUser();
  if (!user.id) return redirect("/sign-in");

  // GET GROUP INFO
  await query.prefetchQuery({
    queryKey: ["group-info"],
    queryFn: () => getGroupInfo({ groupId }),
  });

  // GET ALL USER GROUPS_INFO
  await query.prefetchQuery({
    queryKey: ["user-groups"],
    queryFn: () => getUserGroups({ userID: user.id }),
  });

  // GET CHANNELS

  await query.prefetchQuery({
    queryKey: ["group-channels"],
    queryFn: () => getGroupsChannels({ groupId }),
  });

  //  GET GROUP SUBSCRIPTIONS

  await query.prefetchQuery({
    queryKey: ["group-subscriptions"],
    queryFn: () => getGroupSubscription({ groupId }),
  });

  //  GET MEMBERS CHAT

  await query.prefetchQuery({
    queryKey: ["member-chats"],
    queryFn: () => getMemberChat({ groupId }),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen md:pt-5">
        <Sidebar groupId={groupId} userId={user.id} />
        <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101010] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px]  border-[#28282D]">
          <Navbar groupId={groupId} userId={user.id} />
          {children}
          {/* <MobileNav groupId={groupId} /> */}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default layout;
