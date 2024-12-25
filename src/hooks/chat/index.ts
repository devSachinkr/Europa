import { supabaseClient } from "@/lib/supabase/client";
import { onOnline } from "@/redux/slices/online-member";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
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

export { useGroupChat };
