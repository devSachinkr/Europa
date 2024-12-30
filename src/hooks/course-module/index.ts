"use client";

import {
  createModuleSection,
  getCourseModules,
  updateCourseModule,
  updateCourseSection,
} from "@/actions/course";
import { createCourseModule, getGroupInfo } from "@/actions/group";
import ToastNotify from "@/components/global/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

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
  const [edit, setEdit] = useState<boolean>(false);
  const [editSection, setEditSection] = useState<boolean>(false);
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

  const { data: groupInfo } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => {
      return getGroupInfo({ groupId });
    },
  });
  const client = useQueryClient();

  const { variables, mutate, isPending } = useMutation({
    mutationKey: ["update-module"],
    mutationFn: (data: { action: "NAME" | "DATA"; content: string }) => {
      return updateCourseModule({ ...data, moduleId: moduleId! });
    },
    onMutate: () => setEdit(false),
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
    mutate: updateSection,
    isPending: isPendingSection,
    variables: sectionVariables,
  } = useMutation({
    mutationKey: ["create-module"],
    mutationFn: (data: { action: "NAME"; content: string }) => {
      return updateCourseSection({ ...data, activeSection: activeSection! });
    },
    onMutate: () => setEditSection(false),
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

  const onEditModuleName = (e: Event) => {
    if (inputRef.current && triggerRef.current) {
      if (
        !inputRef.current.contains(e.target as Node | null) &&
        !triggerRef.current.contains(e.target as Node | null)
      ) {
        if (inputRef.current.value) {
          mutate({
            action: "NAME",
            content: inputRef.current.value,
          });
        } else {
          setEdit(false);
        }
      }
    }
  };

  const onEditSectionName = (e: Event) => {
    if (sectionInputRef.current && contentRef.current) {
      if (
        !sectionInputRef.current.contains(e.target as Node | null) &&
        !contentRef.current.contains(e.target as Node | null)
      ) {
        if (sectionInputRef.current.value) {
          updateSection({
            action: "NAME",
            content: sectionInputRef.current.value,
          });
        } else {
          setEditSection(false);
        }
      }
    }
  };

  const onEditModule = ({ id }: { id: string }) => {
    setEdit(true);
    setModuleId(id);
  };

  const onEditSection = () => setEditSection(true);
  useEffect(() => {
    document.addEventListener("click", onEditModuleName, false);
    return () => {
      document.removeEventListener("click", onEditModuleName, false);
    };
  }, [moduleId]);

  useEffect(() => {
    document.addEventListener("click", onEditSectionName, false);
    return () => {
      document.removeEventListener("click", onEditSectionName, false);
    };
  }, [activeSection]);

  return {
    modules,
    groupInfo,
    isPending,
    isPendingSection,
    onEditModule,
    onEditSection,
    edit,
    editSection,
    activeSection,
    moduleId,
    sectionVariables,
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
    
  };
};

export { useCourseModule, useCourseModuleList };
