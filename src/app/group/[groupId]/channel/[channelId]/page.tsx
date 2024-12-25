import { authUser } from "@/actions/auth";
import { getChannelInfo } from "@/actions/channel";
import { getGroupInfo } from "@/actions/group";
import { query } from "@/react-query/query-client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    params: Promise<{
        groupId: string;
        channelId: string;
    }>;
};

const page = async ({ params }: Props) => {
    const { channelId, groupId } = await params;
    const clerkUser=await currentUser();
    const user=await authUser();
    if (!clerkUser || !user.id) return redirect("/sign-in");

    await query.prefetchQuery({
        queryKey:['channel-info'],
        queryFn:()=>getChannelInfo({channelId})
    })
    
    await query.prefetchQuery({
        queryKey:['about-group-info'],
        queryFn:()=>getGroupInfo({groupId})
    })

    return <div>{channelId}</div>;
};

export default page;
