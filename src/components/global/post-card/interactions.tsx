import { useLikeChannelPost } from "@/hooks/channel";
import { Like, Unlike } from "@/icons";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import React from "react";
import { v4 } from "uuid";

type Props = {
  id: string;
  userId?: string;
  optimistic?: boolean;
  likes: number;
  comments: number;
  likedUser?: string;
  likeId?: string;
  page?: boolean;
};

const Interactions = ({
  id,
  userId,
  optimistic,
  likes,
  comments,
  likedUser,
  likeId,
  page,
}: Props) => {
  const { isPending, mutate } = useLikeChannelPost({
    postId: id,
  });
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2",
        page ? "" : " px-6",
      )}
    >
      <div className="flex gap-5 text-[#757272] text-sm">
        <span className="flex gap-1 justify-center items-center">
          {optimistic ? (
            <Unlike />
          ) : isPending ? (
            <span className="cursor-pointer">
              {userId === likedUser ? <Unlike /> : <Like />}
            </span>
          ) : likedUser === userId ? (
            <span
              onClick={() => {
                return mutate({
                  likeId: likeId!,
                });
              }}
              className="cursor-pointer"
            >
              <Like />
            </span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => {
                return mutate({
                  likeId: v4(),
                });
              }}
            >
              <Unlike />
            </span>
          )}
          {isPending ? (likedUser === userId ? likes - 1 : likes + 1) : likes}
        </span>
        <span className="flex gap-1 justify-center items-center">
          <MessageCircle size={16} />
          {comments}
        </span>
      </div>
    </div>
  );
};

export default Interactions;
