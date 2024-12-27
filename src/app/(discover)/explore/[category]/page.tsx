import { getExploreGroups } from "@/actions/group";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import ExplorePageContent from "../_components/explore-page-content";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { category } = await params;
  await query.prefetchQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      return getExploreGroups({
        type: category,
        page: 0,
      });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <h2 className="text-center text-2xl font-bold mt-4">
        Explore {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <ExplorePageContent layout="LIST" category={category} />
    </HydrationBoundary>
  );
};

export default page;
