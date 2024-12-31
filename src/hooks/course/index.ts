"use client";

import {
  createCourse,
  getGroupCourses,
  updateCourseSectionContent,
} from "@/actions/course";
import { getGroupInfo } from "@/actions/group";
import { getSectionInfo } from "@/actions/section";
import { CourseContentSchema } from "@/components/forms/course/schema";
import { CourseSchema } from "@/components/global/create-course/schema";
import ToastNotify from "@/components/global/toast";
import { upload } from "@/lib/upload-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JSONContent } from "novel";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

const useCourse = ({ groupId }: { groupId: string }) => {
  const [privacy, setPrivacy] = useState<string | undefined>("open");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      privacy: "open",
      published: false,
    },
  });

  const client = useQueryClient();

  const { data: groupInfo } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => {
      return getGroupInfo({ groupId });
    },
  });

  const { mutate, isPending, variables } = useMutation({
    mutationKey: ["create-course-mutation"],
    mutationFn: async (data: {
      name: string;
      id: string;
      image: FileList;
      description: string;
      privacy: string;
      createdAt: Date;
      published: boolean;
    }) => {
      const uploadRes = await upload.uploadFile(data.image[0]);
      return createCourse({
        name: data.name,
        id: data.id,
        image: uploadRes.uuid,
        description: data.description,
        privacy: data.privacy,
        published: data.published,
        groupId,
      });
    },
    onMutate: () => {
      buttonRef.current?.click();
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status === 200 ? "Success" : "Oops!",
        msg: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["group-courses"] });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    return mutate({
      createdAt: new Date(),
      name: data.name,
      id: v4(),
      image: data.image,
      description: data.description,
      privacy: data.privacy,
      published: data.published,
    });
  });

  useEffect(() => {
    const privacy = watch(({ privacy }) => {
      return setPrivacy(privacy);
    });
    return () => privacy.unsubscribe();
  }, [watch]);

  return {
    onSubmit,
    isPending,
    errors,
    groupInfo,
    privacy,
    setValue,
    register,
    buttonRef,
    variables,
  };
};

const useCourseInfo = ({ groupId }: { groupId: string }) => {
  const { data: courses } = useQuery({
    queryKey: ["group-courses"],
    queryFn: () => {
      return getGroupCourses({ groupId });
    },
  });
  return { courses };
};

const useCourseSectionInfo = ({ sectionId }: { sectionId: string }) => {
  const { data: sectionInfo } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => {
      return getSectionInfo({ sectionId });
    },
  });
  return { sectionInfo };
};

const useCourseContent = ({
  sectionId,
  description,
  htmlDescription,
  jsonDescription,
}: {
  sectionId: string;
  description: string | null;
  jsonDescription: string | null;
  htmlDescription: string | null;
}) => {
  const jsonContent =
    jsonDescription !== null ? JSON.parse(jsonDescription) : undefined;

  const [onJsonDescription, setJsonDescription] = useState<
    JSONContent | undefined
  >(jsonContent);

  const [onDescription, setDescription] = useState<string | undefined>(
    description || undefined,
  );

  const [onHtmlDescription, setOnHtmlDescription] = useState<
    string | undefined
  >(htmlDescription || undefined);
  const editor = useRef<HTMLFormElement | null>(null);
  const [onEditDescription, setEditDescription] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof CourseContentSchema>>({
    resolver: zodResolver(CourseContentSchema),
  });

  const onSetDescriptions = () => {
    const JsonContent = JSON.stringify(onJsonDescription);
    setValue("JsonContent", JsonContent);
    setValue("content", onDescription as string);
    setValue("htmlContent", onHtmlDescription as string);
  };

  const onEditTextEditor = (e: Event) => {
    if (editor.current) {
      if (!editor.current.contains(e.target as Node | null)) {
        setEditDescription(false);
      } else {
        setEditDescription(true);
      }
    }
  };
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data }: { data: z.infer<typeof CourseContentSchema> }) => {
      return updateCourseSectionContent({
        sectionId,
        data: { ...data },
      });
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status !== 200 ? "Oops!" : "Success",
        msg: data.message,
      });
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: ["section-info"],
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    return mutate({
      data,
    });
  });

  useEffect(() => {
    onSetDescriptions();
    return () => {
      onSetDescriptions();
    };
  }, [onJsonDescription, onDescription]);

  useEffect(() => {
    document.addEventListener("click", onEditTextEditor, false);
    return () => {
      document.removeEventListener("click", onEditTextEditor, false);
    };
  }, []);
  return {
    isPending,
    errors,
    onSubmit,
    setOnHtmlDescription,
    setJsonDescription,
    editor,
    onEditDescription,
    setDescription,
  };
};
export { useCourse, useCourseInfo, useCourseSectionInfo, useCourseContent };
