import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type Props = {
  image: string;
  username: string;
  channelName: string;
};

const PostAuthor = ({ image, username, channelName }: Props) => {
  return (
    <div className="flex flex-col">
      <Avatar className="cursor-pointer">
        <AvatarImage src={image} alt="user-image" />
        <AvatarFallback className="bg-themeGray text-white">
          {username.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-themeTextGray text-sm capitalize">{username}</p>
        <p className="text-themeTextGray text-sm capitalize">
          Posting in{" "}
          <span className="font-bold capitalize  text-gradient pl-2">
            {channelName}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostAuthor;
