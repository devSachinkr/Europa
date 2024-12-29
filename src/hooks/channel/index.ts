/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  deleteChannel,
  getChannelInfo,
  likePost,
  updateChannel,
} from "@/actions/channel";
import { CreatePostSchema } from "@/components/global/post-content/schema";
import ToastNotify from "@/components/global/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JSONContent } from "novel";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import { createPost } from "../../actions/channel";

export const useChannel = () => {
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

  const query = useQueryClient();

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
      mutationFn: (data: { id: string }) => {
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


export const useChannelPage = ({ channelId }: { channelId: string }) => {
  const { data: channel } = useQuery({
    queryKey: ["channel-info"],
    queryFn: () => getChannelInfo({ channelId }),
  });

  const mutation = useMutationState({
    filters: {
      mutationKey: ["create-post"],
      status: "pending",
    },
    select: (data) => {
      return {
        state: data.state.variables as any,
        status: data.state.status,
      };
    },
  });
  return { channel, mutation };
};

export const useCreateChannelPost = ({ channelId }: { channelId: string }) => {
  const [onJsonDescription, setOnJsonDescription] = useState<
    JSONContent | undefined
  >(undefined);

  const [onDescription, setOnDescription] = useState<string | undefined>(
    undefined,
  );

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
  });

  const onSetDescription = () => {
    const JsonContent = JSON.stringify(onJsonDescription);
    setValue("jsoncontent", JsonContent);
    setValue("content", onDescription);
    setValue("htmlcontent", onHtmlDescription);
  };

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: (data: {
      title: string;
      content: string;
      htmlcontent: string;
      jsoncontent: string;
      postId: string;
    }) => {
      return createPost({ channelId, ...data });
    },
    onSuccess: (data) => {
      setOnDescription(undefined);
      setOnHtmlDescription(undefined);
      setOnJsonDescription(undefined);
      return ToastNotify({
        title: data.status !== 201 ? "Oops!" : "Success",
        msg: data.message || "Something went wrong",
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["channel-info"],
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutate({
      title: data.title,
      content: data.content!,
      htmlcontent: data.htmlcontent!,
      jsoncontent: data.jsoncontent!,
      postId: v4(),
    });
  });
  useEffect(() => {
    onSetDescription();
    return () => onSetDescription();
  }, [onJsonDescription, onDescription]);

  return {
    onSubmit,
    isPending,
    onJsonDescription,
    onDescription,
    onHtmlDescription,
    setOnDescription,
    setOnHtmlDescription,
    setOnJsonDescription,
    register,
    errors,
  };
};

export const useLikeChannelPost = ({ postId }: { postId: string }) => {
  const query = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ likeId }: { likeId: string }) => {
      return likePost({ postId, likeId: likeId });
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data?.status !== 201 ? "Oops!" : "Success",
        msg: data?.message || "Something went wrong🔴",
      });
    },
    onSettled: async () => {
      await query.invalidateQueries({
        queryKey: ["unique-post"],
      });
      return await query.invalidateQueries({
        queryKey: ["channel-info"],
      });
    },
  });
  return { isPending, mutate };
};
