/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import InfiniteScrollObserver from "@/components/global/infinite-scroll-observer";
import PostCard from "@/components/global/post-card";
import { useChannelPage } from "@/hooks/channel";
import React from "react";
import PaginatedPosts from "./paginated-posts";

type Props = {
  channelId: string;
  userId: string;
};

const PostFeed = ({ channelId, userId }: Props) => {
  const { channel } = useChannelPage({ channelId });
  const { posts } = channel?.data as {
    posts: ({
      likes: {
        id: string;
        userId: string;
      }[];
      channel: {
        name: string;
      };
      _count: {
        likes: number;
        comments: number;
      };
      author: {
        firstName: string;
        lastName: string;
        image: string | null;
      };
    } & {
      id: string;
      createdAt: Date;
      title: string | null;
      htmlContent: string | null;
      jsonContent: string | null;
      content: string;
      authorId: string;
      channelId: string;
    })[];
  };
  console.log(posts);
  return posts.length ? (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          channelName={post.channel.name}
          title={post.title}
          html={post.htmlContent}
          username={post.author.firstName.concat(
            " ",
            post.author.lastName ?? "User",
          )}
          userImage={post.author.image}
          likes={post._count.likes}
          comments={post._count.comments}
          postId={post.id}
          likedUser={post.likes.length ? post.likes[0].userId : undefined}
          userId={userId}
          likeId={post.likes.length ? post.likes[0].id : undefined}
        />
      ))}
    </>
  ) : (
    <InfiniteScrollObserver
      action="POSTS"
      loading="POST"
      identifier={channelId}
      paginate={posts.length}
    >
      <PaginatedPosts userId={userId} />
    </InfiniteScrollObserver>
  );
};

export default PostFeed;
