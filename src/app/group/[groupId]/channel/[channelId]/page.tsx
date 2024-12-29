import { authUser } from "@/actions/auth";
import { getChannelInfo } from "@/actions/channel";
import { getGroupInfo } from "@/actions/group";
import GroupSideWidget from "@/components/global/group-side-widget";
import { query } from "@/react-query/query-client";
import { currentUser } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import LeaderBoardCard from "../../_components/leader-board";
import CreateNewPost from "./_components/create-post";
import PostFeed from "./_components/post-feed";

type Props = {
  params: Promise<{
    groupId: string;
    channelId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { channelId, groupId } = await params;
  const clerkUser = await currentUser();
  const user = await authUser();
  if (!clerkUser || !user.id) return redirect("/sign-in");

  await query.prefetchQuery({
    queryKey: ["channel-info"],
    queryFn: () => getChannelInfo({ channelId }),
  });

  await query.prefetchQuery({
    queryKey: ["about-group-info"],
    queryFn: () => getGroupInfo({ groupId }),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div
        className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1
            h-0 gap-x-5 px-5  "
      >
        <div className="col-span-1 lg:inline relative hidden  py-5">
          <LeaderBoardCard light />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
          <CreateNewPost
            userImage={clerkUser.imageUrl as string}
            channelId={channelId}
            username={
              clerkUser.firstName?.concat(" ", clerkUser.lastName ?? "") ??
              "User"
            }
          />
          <PostFeed channelId={channelId} userId={user.id} />
        </div>
        <div className="col-span-1 hidden lg:inline relative py-5">
          <GroupSideWidget light />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
