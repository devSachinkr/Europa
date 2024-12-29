import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Message } from "@/icons";
import User from "@/components/global/user-widget/user";
type Props = {
  groupId: string;
};

const MobileNav = async ({ groupId }: Props) => {
  const user = await currentUser();

  return (
    <div className="bg-[#1A1A1D] w-screen py-3 px-11 fixed bottom-0 z-50 md:hidden justify-between items-center flex ">
      <Link href={`/group/${groupId}`}>
        <Home className="h-7 w-7" />
      </Link>
      <Link href={`/group/${groupId}/messages`}>
        <Message />
      </Link>
      <User
        userId={user?.id as string}
        groupId={groupId}
        image={user?.imageUrl as string}
      />
    </div>
  );
};

export default MobileNav;
