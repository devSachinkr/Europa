/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PostCard from "@/components/global/post-card";
import { useAppSelector } from "@/redux/store";
import React from "react";

type Props = {
  userId: string;
};

const PaginatedPosts = ({ userId }: Props) => {
  const { data } = useAppSelector((state) => state.infiniteScroll);
  return data.map((post: any) => (
    <PostCard
      key={post.id}
      {...post}
      html={post.htmlContent}
      likedUser={post.likes.length ? post.likes[0].userId : undefined}
      userId={userId}
      likeId={post.likes.length ? post.likes[0].id : undefined}
      username={post.author.firstName.concat(
        " ",
        post.author.lastName ?? "User",
      )}
      userImage={post.author.image}
      likes={post._count.likes}
      comments={post._count.comments}
      postId={post.id}
    />
  ));
};

export default PaginatedPosts;
