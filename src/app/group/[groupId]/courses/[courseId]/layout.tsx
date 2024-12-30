import { getCourseModules } from "@/actions/course";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import CreateCourseModule from "../_components/create-course-module";
import CourseModuleList from "../_components/course-module-list";

type Props = {
  params: Promise<{
    groupId: string;
    courseId: string;
  }>;
  children: React.ReactNode;
};

const layout = async ({ params, children }: Props) => {
  const { groupId, courseId } = await params;

  await query.prefetchQuery({
    queryKey: ["course-modules"],
    queryFn: () => {
      return getCourseModules({ courseId });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="grid grid-cols-1 h-full lg:grid-cols-4 overflow-hidden ">
        <div className="bg-themeBlack p-5 overflow-y-auto hide-scrollbar  ">
          <CreateCourseModule groupId={groupId} courseId={courseId} />
          <CourseModuleList groupId={groupId} courseId={courseId} />
        </div>
        <div className="lg:col-span-3 max-h-full pb-10 overflow-y-auto bg-[#101011]/90">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default layout;
