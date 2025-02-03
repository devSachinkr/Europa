import { authUser } from "@/actions/auth";
import { getPostComments, getPostInfo } from "@/actions/group";
import PostCommentsForm from "@/components/forms/post-comments";
import GroupSideWidget from "@/components/global/group-side-widget";
import PostComments from "@/components/global/user-comment";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PostInfo from "./_components/post-info";

// import { query } from "@/react-query/query-client";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import React from "react";
// import PostInfo from "./_components/post-info";
//
type Props = {
  params: Promise<{
    postId: string;
    groupId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { postId} = await params;
  await query.prefetchQuery({
    queryKey: ["unique-post"],
    queryFn: () => {
      return getPostInfo({ postId });
    },
  });

  await query.prefetchQuery({
    queryKey: ["post-comments"],
    queryFn: () => {
      return getPostComments({ postId });
    },
  });
  const user = await authUser();
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="grid grid-cols-4 px-5 py-5 gap-x-10">
        <div className="col-span-4 lg:col-span-3">
          <PostInfo postId={postId} />
          <PostCommentsForm
            userName={user.username!}
            image={user.image!}
            postId={postId}
          />
          <PostComments postId={postId} />
        </div>
        <div className="col-span-1 hidden lg:inline relative">
          <GroupSideWidget  light />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default page;
