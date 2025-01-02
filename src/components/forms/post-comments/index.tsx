"use client";
import { Loader } from "@/components/global/loader";
import UserComment from "@/components/global/user-comment/user-comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostComment } from "@/hooks/post";
import { Send } from "lucide-react";
import React from "react";

type Props = {
  userName: string;
  image: string;
  postId: string;
};

const PostCommentsForm = ({ userName, image, postId }: Props) => {
  const { register, onSubmit, isPending, variables } = usePostComment({
    postId,
  });
  return (
    <div className="flex flex-col gap-y-5">
      <form
        onSubmit={onSubmit}
        className="flex items-center border-2 bg-transparent py-2 px-3 mt-5 border-themeGray rounded-xl overflow-hidden"
      >
        <Input
          {...register("comment")}
          className="flex-1  bg-transparent border-none outline-none "
          placeholder="Add a comment"
        />
        <Button
          className=" bg-demonGreen text-white hover:bg-demonGreen/80 disabled:bg-demonGreen/40 disabled:hover:bg-demonGreen/40"
          disabled={isPending}
          type="submit"
        >
          <Loader loading={isPending}>
            <Send className="text-themeTextGray" />
          </Loader>
        </Button>
      </form>
      {isPending && variables && (
        <UserComment
          postId={postId}
          id={variables.commentId}
          optimistic
          userName={userName}
          image={image}
          content={variables.content}
        />
      )}
    </div>
  );
};

export default PostCommentsForm;
