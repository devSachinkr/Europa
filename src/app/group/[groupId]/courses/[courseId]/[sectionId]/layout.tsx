import { getSectionInfo } from "@/actions/section";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import SectionNav from "./_components/section-nav";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    groupId: string;
    courseId: string;
    sectionId: string;
  }>;
};

const layout = async ({ children, params }: Props) => {
  const { sectionId ,groupId} = await params;

  await query.prefetchQuery({
    queryKey: ["section-info"],
    queryFn: () => {
      return getSectionInfo({ sectionId });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <SectionNav groupId={groupId} sectionId={sectionId} />
      {children}
    </HydrationBoundary>
  );
};

export default layout;
