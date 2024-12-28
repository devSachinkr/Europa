"use client";

import { getGroupInfo, updateGroupInfo } from "@/actions/group";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { JSONContent } from "novel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GroupSettingsSchema } from "@/components/forms/group/schema";
import ToastNotify from "@/components/global/toast";
import { upload } from "@/lib/upload-card";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { onClearList } from "@/redux/slices/infinite-scroll";
import { GroupStateProps } from "@/redux/slices/search";
import { validateURLString } from "@/lib/utils";

export type UPDATE_ATTRIBUTES_TYPE =
  | "IMAGE"
  | "ICON"
  | "NAME"
  | "DESCRIPTION"
  | "JSONDESCRIPTION"
  | "HTMLDESCRIPTION";

const onUpdateGroupInfo = async (data: {
  groupId: string;
  type: UPDATE_ATTRIBUTES_TYPE;
  content: string;
  path: "SETTINGS" | "ABOUT";
}) => {
  const res = await updateGroupInfo({
    ...data,
    path:
      data.path === "SETTINGS"
        ? `/group/${data.groupId}/settings`
        : `/about/${data.groupId}`,
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

export const useGroupSettings = ({ groupId }: { groupId: string }) => {
  const { data: group } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => getGroupInfo({ groupId }),
  });

  const jsonContent = group?.data?.jsonDescription
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

  const { mutate: update, isPending } = useMutation({
    mutationKey: ["group-settings"],
    mutationFn: async (data: z.infer<typeof GroupSettingsSchema>) => {
      if (data.thumbnail && data.thumbnail.length) {
        const uploaded = await upload.uploadFile(data.thumbnail[0]);

        await onUpdateGroupInfo({
          groupId,
          content: uploaded.uuid,
          type: "IMAGE",
          path: "SETTINGS",
        });
      }
      if (data.icon && data.icon.length) {
        const uploaded = await upload.uploadFile(data.icon[0]);
        await onUpdateGroupInfo({
          content: uploaded.uuid,
          groupId,
          type: "ICON",
          path: "SETTINGS",
        });
      }
      if (data.name && data.name.length) {
        await onUpdateGroupInfo({
          content: data.name,
          groupId,
          type: "NAME",
          path: "SETTINGS",
        });
      }
      if (data.description && data.description.length) {
        await onUpdateGroupInfo({
          content: data.description,
          groupId,
          type: "DESCRIPTION",
          path: "SETTINGS",
        });
      }
      if (data.htmldescription && data.htmldescription.length) {
        await onUpdateGroupInfo({
          content: data.htmldescription,
          groupId,
          type: "HTMLDESCRIPTION",
          path: "SETTINGS",
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
    description,
  };
};

export const useGroupList = ({ query }: { query: string }) => {
  const { data } = useQuery({
    queryKey: [query],
  });

  const dispatch: AppDispatch = useDispatch();

  const { status, data: groups } = data as {
    status: number;
    data: GroupStateProps[];
  };
  useLayoutEffect(() => {
    dispatch(onClearList({ data: [] }));
  }, []);

  return { status, groups };
};

export const useGroupInfo = () => {
  const { data } = useQuery({
    queryKey: ["about-group-info"],
  });
  const { data: group, status } = data as {
    status: number;
    data: GroupStateProps;
  };
  const router = useRouter();
  useEffect(() => {
    if (status !== 200 || !group) {
      router.push("/explore");
    }
  }, [status, group]);

  return { group };
};

export const useGroupAboutInfo = ({
  groupId,
  description,
  jsonDescription,
  htmlDescription,
  currentMedia,
}: {
  groupId: string;
  description: string | null;
  jsonDescription: string | null;
  htmlDescription: string | null;
  currentMedia: string;
}) => {
  const editor = useRef<HTMLFormElement | null>(null);
  const mediaType = validateURLString(currentMedia);
  const [activeMedia, setActiveMedia] = useState<
    | {
        url: string | undefined;
        type: string;
      }
    | undefined
  >(
    mediaType.type === "IMAGE"
      ? {
          url: currentMedia,
          type: mediaType.type,
        }
      : { ...mediaType },
  );
  console.log(jsonDescription);
  const jsonContent =
    jsonDescription !== null
      ? JSON.parse(jsonDescription as string)
      : undefined;

  const [onJsonDescription, setOnJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent);

  const [onDescription, setOnDescription] = useState<string | undefined>(
    description || undefined,
  );

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(htmlDescription || undefined);

  const [onEditDescription, setOnEditDescription] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof GroupSettingsSchema>>({
    mode: "onBlur",
    resolver: zodResolver(GroupSettingsSchema),
  });

  const onSetDescription = () => {
    const JsonContent = JSON.stringify(onJsonDescription);
    setValue("jsondescription", JsonContent);
    setValue("description", onDescription);
    setValue("htmldescription", onHtmlDescription);
  };

  const onEditTextEditor = (e: MouseEvent) => {
    if (editor.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !editor.current.contains(e.target as Node)
        ? setOnEditDescription(false)
        : setOnEditDescription(true);
    }
  };

  const { mutate: onUpdate, isPending } = useMutation({
    mutationKey: ["about-description"],
    mutationFn: async (data: z.infer<typeof GroupSettingsSchema>) => {
      if (data.description && data.description.length) {
        await onUpdateGroupInfo({
          content: data.description,
          groupId,
          type: "DESCRIPTION",
          path: "ABOUT",
        });
      }
      if (data.jsondescription && data.jsondescription.length) {
        await onUpdateGroupInfo({
          content: data.jsondescription,
          groupId,
          type: "JSONDESCRIPTION",
          path: "ABOUT",
        });
      }
      if (data.htmldescription && data.htmldescription.length) {
        await onUpdateGroupInfo({
          content: data.htmldescription,
          groupId,
          type: "HTMLDESCRIPTION",
          path: "ABOUT",
        });
      }
      if (
        !data.description &&
        !data.jsondescription?.length &&
        !data.htmldescription?.length
      ) {
        return ToastNotify({
          title: "Oops!",
          msg: "Hmm! Looks like the form is empty",
        });
      }
    },
  });

  const onSetActiveMedia = (media: {
    url: string | undefined;
    type: string;
  }) => {
    setActiveMedia(media);
  };

  const onSubmit = handleSubmit(
    async (data: z.infer<typeof GroupSettingsSchema>) => {
      onUpdate({ ...data });
    },
  );

  useEffect(() => {
    onSetDescription();
    return () => onSetDescription();
  }, [onDescription, onJsonDescription]);

  useEffect(() => {
    document.addEventListener("click", onEditTextEditor, false);
    return () => document.removeEventListener("click", onEditTextEditor, false);
  }, []);

  return {
    setOnDescription,
    onDescription,
    setOnJsonDescription,
    onJsonDescription,
    errors,
    onEditDescription,
    editor,
    activeMedia,
    onSetActiveMedia,
    setOnHtmlDescription,
    onSetDescription,
    isPending,
    onSubmit,
  };
};
