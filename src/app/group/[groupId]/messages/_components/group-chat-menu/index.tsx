"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/hooks/chat";
import { useAppSelector } from "@/redux/store";
import { User } from "lucide-react";
import Link from "next/link";

type Props = {
  groupId: string;
};

const GroupChatMenu = ({ groupId }: Props) => {
  const { members } = useAppSelector((state) => state.online);
  const { data, pathname } = useChat({ groupId });

  return (
    <div className="flex flex-col">
      {data?.status === 200 &&
        data.data?.map((m) => (
          <Link
            key={m.id}
            href={`${pathname}/${m.id}`}
            className="flex gap-x-2 items-center p-5 hover:bg-themeGray"
          >
            <div className="relative">
              {members.map(
                (member) =>
                  member.id === m.userId && (
                    <span
                      key={member.id}
                      className="absolute bottom-0 right-0 z-50 w-2 h-2 rounded-full bg-green-500 "
                    ></span>
                  ),
              )}
              <Avatar>
                <AvatarImage src={m.User?.image || ""} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col ">
              <h3>{`${m.User?.firstName} ${m.User?.lastName}`}</h3>
              <p className="text-sm text-themeTextGray">
                No active chat found..
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default GroupChatMenu;
