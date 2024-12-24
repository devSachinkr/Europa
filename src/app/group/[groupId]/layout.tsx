import { authUser } from "@/actions/auth";
import {
    getGroupInfo,
    getGroupsChannels,
    getGroupSubscription,
    getMemberChat,
    getUserGroups,
} from "@/actions/group";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

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
        queryKey: ["member-chat"],
        queryFn: () => getMemberChat({ groupId }),
    });
    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5"></div>
        </HydrationBoundary>
    );
};

export default layout;
