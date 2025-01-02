"use client";

import { createComment, createCommentReply } from "@/actions/channel";
import { getCommentReplies, getPostInfo } from "@/actions/group";
import { PostCommentsSchema } from "@/components/forms/post-comments/schema";
import ToastNotify from "@/components/global/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

const useGetPost = ({ postId }: { postId: string }) => {
  const { isFetched, data } = useQuery({
    queryKey: ["unique-post"],
    queryFn: () => {
      return getPostInfo({ postId });
    },
  });
  return { isFetched, data };
};

const usePostComment = ({ postId }: { postId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof PostCommentsSchema>>({
    resolver: zodResolver(PostCommentsSchema),
  });
  const client = useQueryClient();
  const {
    mutate: onPostComment,
    isPending,
    variables,
  } = useMutation({
    mutationFn: (data: { content: string; commentId: string }) => {
      return createComment({
        postId,
        content: data.content,
        commentId: data.commentId,
      });
    },
    onMutate: () => reset(),
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status === 200 ? "Success" : "Oops!",
        msg: data.message,
      });
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["post-comments"] });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    onPostComment({
      content: data.comment,
      commentId: v4(),
    });
  });

  return { register, errors, onSubmit, isPending, variables };
};

const useReply = () => {
  const [reply, setReply] = useState<{
    comment?: string;
    reply: boolean;
  }>({
    comment: undefined,
    reply: false,
  });

  const [activeComment, setActiveComment] = useState<string | undefined>(
    undefined,
  );

  const onSetReply = (commentId: string) => {
    setReply((prev) => ({ ...prev, comment: commentId, reply: true }));
  };
  const onSetActiveComment = (commentId: string) => {
    setActiveComment(commentId);
  };
  return {
    reply,
    activeComment,
    onSetReply,
    onSetActiveComment,
  };
};

const useGetReplies = ({ activeComment }: { activeComment: string }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["comment-replies", activeComment],
    queryFn: () => {
      return getCommentReplies({ commentId: activeComment });
    },
    enabled: !!activeComment,
  });
  return { data, isFetching };
};

const usePostReply = ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const { register, handleSubmit, reset } = useForm<
    z.infer<typeof PostCommentsSchema>
  >({
    resolver: zodResolver(PostCommentsSchema),
  });

  const { mutate, variables, isPending } = useMutation({
    mutationFn: (data: { comment: string; replyId: string }) => {
      return createCommentReply({
        postId,
        commentId,
        content: data.comment,
        replyId: data.replyId,
      });
    },
    onMutate: () => reset(),
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status === 200 ? "Success" : "Oops!",
        msg: data.message,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      comment: data.comment,
      replyId: v4(),
    });
  });

  return { register, variables, isPending, onSubmit };
};

export { useGetPost, useGetReplies, usePostComment, useReply, usePostReply };
