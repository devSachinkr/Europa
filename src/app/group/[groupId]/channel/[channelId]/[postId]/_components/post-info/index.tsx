"use client";
import GradientText from "@/components/global/gradient-text";
import { HtmlParser } from "@/components/global/html-parser";
import Interactions from "@/components/global/post-card/interactions";
import PostAuthor from "@/components/global/post-card/post-author";
import { useGetPost } from "@/hooks/post";
import { Empty } from "@/icons";

type Props = {
  postId: string;
};

const PostInfo = ({ postId }: Props) => {
  const { data: postInfo} = useGetPost({ postId });
  console.log(postInfo);
  if (!postInfo?.data || postInfo?.status !== 200) {
    return (
      <div>
        <Empty />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-5">
      <PostAuthor
        username={postInfo?.data?.author?.firstName.concat(
          " ",
          postInfo?.data?.author?.lastName,
        )}
        image={postInfo?.data?.author?.image as string}
        channelName={postInfo?.data?.channel?.name as string}
      />
      <div className="flex flex-col gap-y-3">
        <GradientText element="H2" className="text-2xl font-bold">
          {postInfo?.data?.title}
        </GradientText>
        <HtmlParser html={postInfo?.data?.htmlContent as string || "<></>"} />
      </div>
      <Interactions
        id={postId}
        page
        userId={postInfo?.data?.authorId as string}
        likedUser={
          postInfo?.data && postInfo?.data?.likes?.length > 0
            ? postInfo?.data?.likes[0].userId
            : undefined
        }
        likeId={
          postInfo?.data && postInfo?.data?.likes?.length > 0
            ? postInfo?.data?.likes[0].id
            : undefined
        }
        likes={postInfo?.data?._count?.likes || 0}
        comments={postInfo?.data?._count?.comments || 0}
      />
    </div>
  );
};

export default PostInfo;
