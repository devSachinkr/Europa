"use client";
import { usePostReply } from "@/hooks/post";
import React from "react";
import UserComment from "../user-comment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "../../loader";
import { Send } from "lucide-react";

type Props = {
  commentId: string;
  postId: string;
  userName: string;
  image: string;
};

const PostReply = ({ commentId, postId, userName, image }: Props) => {
  const { isPending, onSubmit, register, variables } = usePostReply({
    commentId,
    postId,
  });
  return (
    <div className="flex flex-col gap-y-5 w-full">
      {isPending && variables && (
        <UserComment
          postId={postId}
          id={variables.replyId}
          optimistic
          userName={userName}
          image={image}
          content={variables.comment}
        />
      )}
      <form
        onSubmit={onSubmit}
        className="flex items-center border-2 bg-transparent py-2 px-3 mt-5 border-themeGray rounded-xl overflow-hidden"
      >
        <Input
          {...register("comment")}
          className="flex-1  bg-transparent border-none outline-none "
          placeholder="Add a reply"
        />
        <Button className="bg-demonGreen text-white hover:bg-demonGreen/80 font-semibold">
          <Loader loading={isPending}>
            <Send className="text-themeTextGray" />
          </Loader>
        </Button>
      </form>
    </div>
  );
};

export default PostReply;
