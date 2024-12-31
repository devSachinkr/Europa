import GlassSheet from "@/components/global/glass-sheet";
import { Menu } from "lucide-react";
import React from "react";
import GroupChatMenu from "./_components/group-chat-menu";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
  children: React.ReactNode;
};

const layout = async ({ params, children }: Props) => {
  const { groupId } = await params;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 flex-1 h-0">
      <div className="lg:col-span-4 flex flex-col">
        <div className="flex justify-between items-center p-5 lg:hidden">
          <p className="font-medium text-themeTextWhite">No Chat Selected</p>
          <GlassSheet trigger={<Menu />}>
            <GroupChatMenu groupId={groupId} />
          </GlassSheet>
        </div>
        {children}
      </div>
      <div className="hidden lg:inline lg:col-span-2 bg-themeBlack rounded-tl-3xl overflow-auto">
        <GroupChatMenu groupId={groupId} />
      </div>
    </div>
  );
};

export default layout;
