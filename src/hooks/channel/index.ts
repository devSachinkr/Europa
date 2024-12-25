"use client";

import { deleteChannel, updateChannel } from "@/actions/channel";
import ToastNotify from "@/components/global/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const useChannel = () => {
    const channelRef = useRef<HTMLAnchorElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [channel, setChannel] = useState<string | undefined>(undefined);
    const [edit, setEdit] = useState<boolean>(false);
    const [icon, setIcon] = useState<string | undefined>(undefined);

    const onEditChannel = ({ id }: { id: string | undefined }) => {
        setChannel(id);
        setEdit(true);
    };

    const onSetIcon = ({ icon }: { icon: string | undefined }) => setIcon(icon);

    const query=useQueryClient();

    const { mutate, isPending, variables } = useMutation({
        mutationFn: (data: { name?: string; icon?: string }) => {
            return updateChannel({ id: channel!, ...data });
        },
        onMutate: () => {
            setEdit(false);
            onSetIcon({ icon: undefined });
        },

        onSuccess: (data) => {
            return ToastNotify({
                title: data.status !== 202 ? "Oops!" : "Success",
                msg: data.message || "Something went wrong🔴",
            });
        },
        onSettled: async () => {
            return await query.invalidateQueries({
                queryKey: ["group-channels"],
            });
        },
    });

    const { mutate: deleteMutationChannel, variables: deleteChannelVariables } =
        useMutation({
            mutationFn: (data:{id:string}) => {
                return deleteChannel({ id: data.id! });
            },
            onSuccess: (data) => {
                return ToastNotify({
                    title: data.status !== 200 ? "Oops!" : "Success",
                    msg: data.message || "Something went wrong🔴",
                });
            },
            onSettled: async () => {
                return await query.invalidateQueries({
                    queryKey: ["group-channels"],
                });
            },
        });

    const onEndChannelEdit = () => {
        if (inputRef.current && channelRef.current && triggerRef.current) {
            if (
                !inputRef.current.contains(event?.target as Node | null) &&
                !triggerRef.current.contains(event?.target as Node | null) &&
                !channelRef.current.contains(event?.target as Node | null) &&
                !document.getElementById("icon-list")
            ) {
                if (inputRef.current.value) {
                    mutate({
                        name: inputRef.current.value,
                    });
                }
                if (icon) {
                    mutate({ icon });
                } else {
                    setEdit(false);
                }
            }
        }
    };
   
    
    useEffect(() => {
        document.addEventListener("click", onEndChannelEdit, false);

        return () => {
            document.removeEventListener("click", onEndChannelEdit, false);
        };
    }, []);
    return {
        channelRef,
        inputRef,
        triggerRef,
        channel,
        edit,
        icon,
        onEditChannel,
        onSetIcon,
        mutate,
        isPending,
        variables,
        deleteMutationChannel,
        deleteChannelVariables,
    };
};

export { useChannel };
