"use client";

import { getGroupInfo, updateGroupInfo } from "@/actions/group";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GroupSettingsSchema } from "@/components/forms/group/schema";
import ToastNotify from "@/components/global/toast";
import { upload } from "@/lib/upload-card";
import { useRouter } from "next/navigation";

export type UPDATE_ATTRIBUTES_TYPE =
  | "IMAGE"
  | "ICON"
  | "NAME"
  | "DESCRIPTION"
  | "JSONDESCRIPTION"
  | "HTMLDESCRIPTION";



export const useGroupSettings = ({ groupId }: { groupId: string }) => {
  const { data: group } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => getGroupInfo({ groupId }),
  });

  const jsonContent =
    group?.data?.jsonDescription
      ? JSON.parse(group?.data?.jsonDescription as string)
      : undefined;
  const [jsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent);

  const [description, setDescription] = useState<string | undefined>(
    group?.data?.description || undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<z.infer<typeof GroupSettingsSchema>>({
    mode: "onBlur",
    resolver: zodResolver(GroupSettingsSchema),
  });
  const [previewIcon, setPreviewIcon] = useState<string | undefined>(undefined);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | undefined>(
    undefined,
  );

  const setDescriptions = () => {
    const jsonContent = JSON.stringify(jsonDescription);
    setValue("jsondescription", jsonContent);
    setValue("description", description);
  };
  useEffect(() => {
    const previews = watch(({ thumbnail, icon }) => {
      if (icon?.[0]) {
        setPreviewIcon(URL.createObjectURL(icon[0]));
      }
      if (thumbnail?.[0]) {
        setPreviewThumbnail(URL.createObjectURL(thumbnail[0]));
      }
    });
    return () => previews.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setDescriptions();
    return () => setDescriptions();
  }, [jsonDescription, description]);

  const onUpdateGroupInfo = async (data: {
    groupId: string;
    type: UPDATE_ATTRIBUTES_TYPE;
    content: string;
    path?: string;
  }) => {
    const res = await updateGroupInfo({
      ...data,
      path: data.path || `/group/${groupId}/settings`,
    });
    if (res.status !== 204) {
      return ToastNotify({
        msg: res.message,
        title: "Oops!",
      });
    }
    if (res.status === 204) {
      return ToastNotify({
        title: "Success",
        msg: res.message,
      });
    }
  };

  const { mutate: update, isPending } = useMutation({
    mutationKey: ["group-settings"],
    mutationFn: async (data: z.infer<typeof GroupSettingsSchema>) => {
      if (data.thumbnail && data.thumbnail.length) {
        const uploaded = await upload.uploadFile(data.thumbnail[0]);

        await onUpdateGroupInfo({
          groupId,
          content: uploaded.uuid,
          type: "IMAGE",
        });
      }
      if (data.icon && data.icon.length) {
        const uploaded = await upload.uploadFile(data.icon[0]);
        await onUpdateGroupInfo({
          content: uploaded.uuid,
          groupId,
          type: "ICON",
        });
      }
      if (data.name && data.name.length) {
        await onUpdateGroupInfo({
          content: data.name,
          groupId,
          type: "NAME",
        });
      }
      if (data.description && data.description.length) {
        await onUpdateGroupInfo({
          content: data.description,
          groupId,
          type: "DESCRIPTION",
        });
      }
      if (data.htmldescription && data.htmldescription.length) {
        await onUpdateGroupInfo({
          content: data.htmldescription,
          groupId,
          type: "HTMLDESCRIPTION",
        });
      }
      if (
        !data.description &&
        !data.name &&
        !data.icon.length &&
        !data.thumbnail.length &&
        !data.jsondescription?.length
      ) {
        return ToastNotify({
          title: "Oops!",
          msg: "Hmm! Looks like the form is empty",
        });
      }
    },
  });

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => update({ ...data }));
  if (group?.status !== 200) router.push("/group/create");

  return {
    onSubmit,
    isPending,
    previewThumbnail,
    previewIcon,
    errors,
    register,
    setDescription,
    setJsonDescription,
    group,
    update,
    jsonDescription,
    description
  };
};
