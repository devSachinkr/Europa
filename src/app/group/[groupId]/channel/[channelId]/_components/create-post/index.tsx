"use client";
import PostCard from "@/components/global/post-card";
import { PostContent } from "@/components/global/post-content";
import { SimpleModal } from "@/components/global/simple-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useChannelPage } from "@/hooks/channel";
import React from "react";

type Props = {
  userImage: string;
  channelId: string;
  username: string;
};

const CreateNewPost = ({ userImage, channelId, username }: Props) => {
  const { channel, mutation } = useChannelPage({
    channelId,
  });
  const { name } = channel?.data as { name: string };
  return (
    <>
      <SimpleModal
        trigger={
          <span>
            <Card className="bodrer-demonGreen cursor-pointer first-letter:rounded-2xl overflow-hidden">
              <CardContent className="p-3 bg-[#1A1A1D] flex gap-x-6 items-center">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={userImage} alt="user-image" />
                  <AvatarFallback className="bg-themeGray text-white">
                    {username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardDescription className="text-themeTextGray">
                  Type / to add elements tou your page
                </CardDescription>
              </CardContent>
            </Card>
          </span>
        }
      >
        <div className="flex gap-x-3">
          <Avatar className="cursor-pointer">
            <AvatarImage src={userImage} alt="user-image" />
            <AvatarFallback className="bg-themeGray text-white">
              {username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <p className="text-themeTextGray text-sm capitalize">{username}</p>
            <p className="text-themeTextGray text-sm capitalize">
              Posting in{" "}
              <span className="font-bold capitalize  text-gradient pl-2">
                {name}
              </span>
            </p>
          </div>
        </div>

        <PostContent channelId={channelId} />
      </SimpleModal>
      {mutation.length > 0 &&
        mutation[0].status === "pending" &&
        mutation[0].state && (
          <PostCard
            channelName={name}
            userImage={userImage}
            username={username}
            html={mutation[0].state.data?.htmlContent}
            title={mutation[0].state.data?.title}
            likes={0}
            comments={0}
            postId={mutation[0].state.data?.id}
            optimistic
          />
        )}
    </>
  );
};

export default CreateNewPost;
