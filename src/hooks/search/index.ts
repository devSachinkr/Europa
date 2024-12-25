"use client";

import { searchGroups } from "@/actions/group";
import { onReset, onSearch } from "@/redux/slices/search";
import { AppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useSearch = ({ searchType }: { searchType: "GROUPS" | "POSTS" }) => {
  const [query, setQuery] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { refetch, isFetched, isFetching, data } = useQuery({
    queryKey: ["search-data", debounce],
    queryFn: async ({ queryKey }) => {
      switch (searchType) {
        case "GROUPS": {
          const groups = await searchGroups({ query: queryKey[1], searchType });
          return groups;
        }
        case "POSTS": {
          // FOR FUTURE UPDATES
          return null;
        }
      }
    },
    enabled: false,
  });

  if (isFetching) {
    dispatch(
      onSearch({
        isSearching: true,
        data: [],
      }),
    );
  }

  if (isFetched) {
    dispatch(
      onSearch({
        isSearching: false,
        status: data?.status as number,
        data: data?.data || [],
        debounce,
      }),
    );
  }
  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      setDebounce(query);
    }, 500);
    return () => clearTimeout(delayInputTimeout);
  }, [query, 500]);

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) dispatch(onReset());
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      debounce;
    };
  }, [debounce]);
  return { query,handleSearch};
};

export { useSearch };
