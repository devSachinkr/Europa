"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GradientText from "../gradient-text";
import { HtmlParser } from "../html-parser";
import Interactions from "./interactions";
import PostAuthor from "./post-author";

type Props = {
  channelName: string;
  userImage?: string;
  username?: string;
  html: string;
  title: string;
  likes: number;
  comments: number;
  postId: string;
  optimistic?: boolean;
  likedUser?: string;
  likeId?: string;
  userId?: string;
};

const PostCard = ({
  channelName,
  userImage,
  username,
  html,
  title,
  likes,
  comments,
  postId,
  optimistic,
  likeId,
  likedUser,
  userId,
}: Props) => {
  const pathname = usePathname();
  return (
    <Card className="border-themeGray bg-[#1A1A1D] first-letter:rounded-2xl overflow-hidden">
      <CardContent className="p-2 flex flex-col gap-y-6 items-start">
        <PostAuthor
          image={userImage!}
          username={username!}
          channelName={channelName}
        />
        <Link href={`${pathname}/${postId}`} className="w-full">
          <div className="flex flex-col gap-y-3">
            <GradientText element="H2" className="text-2xl font-bold">
              {title}
            </GradientText>
            <HtmlParser html={html || "<></>"} />
          </div>
        </Link>
      </CardContent>
      <Separator orientation="horizontal" className="bg-themeGray mt-3" />
      <Interactions
        id={postId}
        userId={userId}
        likes={likes}
        comments={comments}
        likedUser={likedUser}
        likeId={likeId}
        optimistic={optimistic}
      />
    </Card>
  );
};

export default PostCard;
