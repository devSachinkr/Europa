import { useAppSelector } from "@/redux/store";
import React from "react";

type Props = {
  userId: string;
  receiverId: string;
};

const ChatWindow = ({ receiverId, userId }: Props) => {
  const {} = useChatWindow({ receiverId });
  const {} = useAppSelector((state) => state.chat);
  return (
    <div
      className="flex-1 flex py-5 flex-col gap-y-3 h-0 overflow-auto"
      ref={messageWindowRef}
    >
      {chat.map((m) => (
        <ChatBubble key={m.id} {...m} userId={userId} />
      ))}
    </div>
  );
};

export default ChatWindow;
