"use client";

import { updateCourseSection } from "@/actions/course";
import { getGroupInfo } from "@/actions/group";
import { getSectionInfo } from "@/actions/section";
import { SectionSchema } from "@/components/forms/section/schema";
import ToastNotify from "@/components/global/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useSectionNav = ({
  sectionId,
  groupId,
}: {
  sectionId: string;
  groupId?: string;
}) => {
  const client = useQueryClient();

  const { data: sectionInfo } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => {
      return getSectionInfo({ sectionId });
    },
  });

  const { data: groupInfo } = useQuery({
    queryKey: ["group-info"],
    queryFn: () => {
      return getGroupInfo({ groupId: groupId! });
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      return updateCourseSection({
        action: "COMPLETE",
        activeSection: sectionId,
        content: "",
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
        queryKey: ["course-modules"],
      });
    },
  });

  return {
    isPending,
    mutate,
    sectionInfo,
    groupInfo,
  };
};

const useSectionForm = ({ sectionId }: { sectionId: string }) => {
  const { data: sectionInfo } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => {
      return getSectionInfo({ sectionId });
    },
  });
  const client = useQueryClient();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof SectionSchema>>({
    resolver: zodResolver(SectionSchema),
    defaultValues: {
      name: sectionInfo?.data?.name || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name }: z.infer<typeof SectionSchema>) => {
      return updateCourseSection({
        action: "NAME",
        activeSection: sectionId,
        content: name,
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
        queryKey: ["course-modules"],
      });
      return await client.invalidateQueries({
        queryKey: ["section-info"],
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      ...data,
    });
  });

  return { onSubmit, errors, isPending, register };
};

export { useSectionNav, useSectionForm };
