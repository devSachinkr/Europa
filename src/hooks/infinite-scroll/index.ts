"use client";

import { getPaginatedPosts, searchGroups } from "@/actions/group";
import { onInfiniteScroll } from "@/redux/slices/infinite-scroll";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

type InfiniteScrollOptions_Props = {
  action: "GROUPS" | "POSTS" | "CHANNELS";
  indentifier: string;
  paginate: number;
  search?: boolean;
  query?: string;
};

const useInfiniteScroll = ({
  action,
  indentifier,
  paginate,
  search,
  query,
}: InfiniteScrollOptions_Props) => {
  const observerElement = useRef<HTMLDivElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { data } = useAppSelector((state) => state.infiniteScroll);

  const {
    data: paginatedData,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["infinite-scroll"],
    queryFn: async () => {
      if (search) {
        switch (action) {
          case "GROUPS": {
            const res = await searchGroups({
              searchType: action,
              query: query as string,
              paginate: paginate + data.length,
            });
            if (res.status === 200) {
              return res.data;
            }
            return [];
          }
          case "POSTS": {
            const res = await getPaginatedPosts({
              indentifier,
              paginate: paginate + data.length,
            });
            if (res.status === 200) {
              return res.data;
            }
            return [];
          }
          default: {
            return [];
          }
        }
      }
      return [];
    },
    enabled: true,
  });
  useEffect(() => {
    if (isFetched && paginatedData) {
      dispatch(onInfiniteScroll({ data: paginatedData }));
    }
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        refetch();
      }
    });
    observer.observe(observerElement.current as Element);
    return () => {
      observer.disconnect();
    };
  }, []);
  return { observerElement, isFetching };
};

export { useInfiniteScroll };
