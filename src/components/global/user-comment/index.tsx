"use client";
import { useComments } from "@/hooks/channel";
import React from "react";
import GradientText from "../gradient-text";
import { useReply } from "@/hooks/post";
import UserComment from "./user-comment";

type Props = {
  postId: string;
};

const PostComments = ({ postId }: Props) => {
  const { data } = useComments({ postId });
  const { activeComment, onSetReply, onSetActiveComment, reply } = useReply();
  return (
    <div className="mt-5">
      {data?.data?.length && data?.status === 200 ? (
        data.data.map((c) => (
          <UserComment
            id={c.id}
            key={c.id}
            onReply={() => onSetReply(c.id)}
            reply={reply}
            userName={c.user.firstName.concat(" ", c.user.lastName)}
            image={c.user.image ?? ""}
            content={c.content}
            postId={postId}
            replyCount={c._count.reply}
            commentId={c.commentId!}
            replied={c.replied!}
            activeComment={activeComment}
            onActiveComment={() => onSetActiveComment(c.id)}
          />
        ))
      ) : (
        <GradientText element="H2" className="text-2xl p-10 font-bold">
          No comments yet
        </GradientText>
      )}
    </div>
  );
};

export default PostComments;
