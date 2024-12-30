"use client";

import { updateCourseSection } from "@/actions/course";
import { getSectionInfo } from "@/actions/section";
import ToastNotify from "@/components/global/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSectionNav = ({ sectionId }: { sectionId: string }) => {
  const client = useQueryClient();

  const { data: sectionInfo } = useQuery({
    queryKey: ["section-info"],
    queryFn: () => {
      return getSectionInfo({ sectionId });
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
  };
};

export { useSectionNav };
