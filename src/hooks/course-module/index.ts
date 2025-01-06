"use client";

import {
  createModuleSection,
  getCourseModules,
  updateCourseModule,
} from "@/actions/course";
import { createCourseModule, getGroupInfo } from "@/actions/group";
import ToastNotify from "@/components/global/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

const CourseModuleSchema = z.object({
  title: z.string().min(1, { message: "Module name is required" }),
});

const useCourseModule = ({
  groupId,
  courseId,
}: {
  groupId: string;
  courseId: string;
}) => {
  const client = useQueryClient();

  const { data: groupInfo } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => {
      return getGroupInfo({ groupId });
    },
  });

  const { mutate, isPending, variables } = useMutation({
    mutationKey: ["create-module"],
    mutationFn: (data: {
      courseId: string;
      title: string;
      moduleId: string;
    }) => {
      return createCourseModule({ ...data });
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status !== 200 ? "Oops!" : "Success",
        msg: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["course-modules"] });
    },
  });

  const onSubmit = () => {
    mutate({
      courseId,
      title: "New Module",
      moduleId: v4(),
    });
  };
  return {
    onSubmit,
    isPending,
    groupInfo,
    variables,
  };
};

const useCourseModuleList = ({
  groupId,
  courseId,
}: {
  groupId: string;
  courseId: string;
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLAnchorElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sectionInputRef = useRef<HTMLInputElement | null>(null);
  const [activeSection, setActiveSection] = useState<string | undefined>(
    undefined,
  );
  const [moduleId, setModuleId] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const { data: modules } = useQuery({
    queryKey: ["course-modules"],
    queryFn: () => {
      return getCourseModules({ courseId });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CourseModuleSchema>>({
    resolver: zodResolver(CourseModuleSchema),
    defaultValues: {
      title:
        modules?.data?.find((module) => moduleId && module.id === moduleId)
          ?.title || "",
    },
  });

  const { data: groupInfo } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => {
      return getGroupInfo({ groupId });
    },
  });
  const client = useQueryClient();

  const {
    variables,
    mutate: updateModule,
    isPending,
  } = useMutation({
    mutationKey: ["update-module"],
    mutationFn: (data: { action: "NAME" | "DATA"; content: string }) => {
      return updateCourseModule({ ...data, moduleId: moduleId! });
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status !== 200 ? "Oops!" : "Success",
        msg: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["course-modules"] });
    },
  });

  const {
    mutate: createSection,
    isPending: isPendingCreateSection,
    variables: createSectionVariables,
  } = useMutation({
    mutationFn: (data: { moduleId: string; sectionId: string }) => {
      return createModuleSection({ ...data });
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data.status !== 200 ? "Oops!" : "Success",
        msg: data.message,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["course-modules"] });
    },
  });

  const updateModuleName = handleSubmit(({ title }) => {
    return updateModule({
      action: "NAME",
      content: title,
    });
  });

  return {
    modules,
    groupInfo,
    isPending,
    activeSection,
    moduleId,
    createSectionVariables,
    triggerRef,
    contentRef,
    inputRef,
    variables,
    pathname,
    createSection,
    isPendingCreateSection,
    setActiveSection,
    sectionInputRef,
   updateModuleName,
    setModuleId,
    register,
    errors,
  };
};

export { useCourseModule, useCourseModuleList };
