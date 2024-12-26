import { getExploreGroups } from "@/actions/group";
import { query } from "@/react-query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import ExplorePageContent from "./_components/explore-page-content";

const page = async () => {
  await query.prefetchQuery({
    queryKey: ["fitness"],
    queryFn: async () => {
      return getExploreGroups({
        type: "fitness",
        page: 0,
      });
    },
  });
  await query.prefetchQuery({
    queryKey: ["music"],
    queryFn: async () => {
      return getExploreGroups({
        type: "music",
        page: 0,
      });
    },
  });

  await query.prefetchQuery({
    queryKey: ["lifestyle"],
    queryFn: async () => {
      return getExploreGroups({
        type: "lifestyle",
        page: 0,
      });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ExplorePageContent layout="SLIDER" />
    </HydrationBoundary>
  );
};

export default page;
