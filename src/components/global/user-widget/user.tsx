"use client";
import { useClerk } from "@clerk/nextjs";
import React from "react";
import Dropdown from "../drop-down";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Logout, Settings } from "@/icons";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getGroupInfo } from "@/actions/group";

type Props = {
  image: string;
  userId: string;
  groupId: string;
};

const User = ({ groupId, image }: Props) => {
  const {data} =useQuery({
    queryKey: ["group-info"],
    queryFn: () => getGroupInfo({ groupId }),
  })
  const { signOut } = useClerk(); 
 
  const logout = async () => {
    
    signOut({ redirectUrl: "/" });
  };
  return (
    <Dropdown
      trigger={
        <Avatar>
          <AvatarImage src={image} alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      }
      title="Account"
    >
      {data?.groupOwner && (
        <Link
          href={`/group/${groupId}/settings`}
          className="flex gap-x-2 px-2 mb-4"
        >
          <Settings /> Settings
        </Link>
      )}
      <Button
        className="flex items-center gap-3 bg-demonGreen hover:bg-demonGreen/80 outline-none text-white justify-start w-full"
        onClick={logout}
      >
        <Logout />
        Logout
      </Button>
    </Dropdown>
  );
};

export default User;
