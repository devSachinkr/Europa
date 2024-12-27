"use client";

import { getExploreGroups } from "@/actions/group";
import { onInfiniteScroll } from "@/redux/slices/infinite-scroll";
import { AppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useExploreSlider = ({
  query,
  groups: pagination,
}: {
  query: string;
  groups: number;
}) => {
  const [loadSlider, setLoadSlider] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { data, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["fetch-group-slides"],
    queryFn: async () => {
      return getExploreGroups({
        type: query,
        page: pagination || 0,
      });
    },
    enabled: false,
  });

  if (isFetched && data?.status === 200 && data?.data) {
    dispatch(
      onInfiniteScroll({
        data: data.data,
      }),
    );
  }
  useEffect(() => {
    setLoadSlider(true);
  }, []);
  return { loadSlider, isFetching, refetch, data };
};
