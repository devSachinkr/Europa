import { getGroupCourses } from "@/actions/course";
import CourseCreate from "@/components/global/create-course";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { groupId } = await params;

  await query.prefetchQuery({
    queryKey: ["group-courses"],
    queryFn: () => getGroupCourses({ groupId }),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="container grid lg:grid-cols-2 2xl:grid-cols-3 py-10 gap-5">
        <CourseCreate groupId={groupId} />
        {/* <CourseList groupId={groupId} /> */}
      </div>
    </HydrationBoundary>
  );
};

export default page;
