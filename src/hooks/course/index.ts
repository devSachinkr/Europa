"use client";

import { createCourse, getGroupCourses } from "@/actions/course";
import { getGroupInfo } from "@/actions/group";
import { CourseSchema } from "@/components/global/create-course/schema";
import ToastNotify from "@/components/global/toast";
import { upload } from "@/lib/upload-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export { useCourse, useCourseInfo };
