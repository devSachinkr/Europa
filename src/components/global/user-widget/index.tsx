import { Message } from "@/icons";
import Link from "next/link";
import React from "react";
import User from "./user";

type Props = {
  image: string;
  groupId?: string;
  userId: string;
};

const UserWidget = ({ groupId, image, userId }: Props) => {
  return (
    <div className="gap-5 items-center hidden md:flex ">
      <Link href={`/group/${groupId}/messages`}>
        <Message />
      </Link>
      <User userId={userId} image={image} groupId={groupId!} />
    </div>
  );
};

export default UserWidget;
