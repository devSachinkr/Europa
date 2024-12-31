"use client";
import { getAllGroupChat, onGetAllUserMessages } from "@/actions/group";
import { supabaseClient } from "@/lib/supabase/client";
import { onOnline } from "@/redux/slices/online-member";
import { AppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const useGroupChat = ({ userId }: { userId: string }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const channel = supabaseClient().channel("tracking");

    channel
      .on(
        "presence",
        {
          event: "sync",
        },
        () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const state: any = channel.presenceState();
          console.log(state);
          for (const user in state) {
            dispatch(
              onOnline({
                members: [{ id: state[user][0].member?.userId }],
              }),
            );
          }
        },
      )
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            userId,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);
};

const useChat = ({ groupId }: { groupId: string }) => {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ["members-chat"],
    queryFn: () => {
      return getAllGroupChat({ groupId });
    },
  });
  return {
    data,
    pathname,
  };
};

const useChatWindow = ({ receiverId }: { receiverId: string }) => {
    const dispatch:AppDispatch = useDispatch();
  const { data, isFetched } = useQuery({
    queryKey: ["user-messages"],
    queryFn: () => {
      return onGetAllUserMessages({ receiverId });
    },
  });

  const messageWindowRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current?.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    supabaseClient().channel("table-db-changes").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "Message",
    }, 
    async (payload)=>{
        dispatch(
            //  First  Create Slice to  continue
            onChat
        )
    }

);
  }, [isFetched]);
};

export { useGroupChat, useChat, useChatWindow };
