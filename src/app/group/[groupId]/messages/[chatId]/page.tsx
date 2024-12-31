import { authUser } from "@/actions/auth";
import { getUserMembership, onGetAllUserMessages } from "@/actions/group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { User } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{
    chatId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { chatId } = await params;
  const member = await getUserMembership({ chatId });
  await query.prefetchQuery({
    queryKey: ["user-messages"],
    queryFn: () => {
      return onGetAllUserMessages({ receiverId: chatId });
    },
  });
  const user = await authUser();

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="h-full flex flex-col p-5">
        <div className="bg-themeBlack rounded-2xl p-5">
          <div className="flex gap-x-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src={member.data?.User?.image || ""} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-2xl capitalize">
              {member.data?.User?.firstName} {member.data?.User?.lastName}
            </h3>
          </div>
        </div>
        {/* <ChatWindow
          userId={user.id}
          receiverId={member.data?.User?.id as string}
        /> */}
        {/* <HuddlesForm receiverId={member.data?.User?.id as string} /> */}
      </div>
    </HydrationBoundary>
  );
};

export default page;
