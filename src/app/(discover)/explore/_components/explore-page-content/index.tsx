"use client";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";

type Props = {
  layout: "SLIDER" | "LIST";
};

const SearchGroups = dynamic(
  () => import("./search-groups").then((mod) => mod.SearchGroups),
  { ssr: false },
);
const ExplorePageContent = ({ layout }: Props) => {
  const { isSearching, data, status, debounce } = useAppSelector(
    (state) => state.search,
  );

  return (
    <div className="flex flex-col">
      {isSearching || debounce || debounce?.length ? (
        <SearchGroups searching={isSearching} query={debounce} data={data} />
      ) : null}
    </div>
  );
};

export default ExplorePageContent;
