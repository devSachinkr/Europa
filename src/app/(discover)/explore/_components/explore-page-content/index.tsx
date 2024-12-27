"use client";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import ExploreSlider from "../explore-slider";
import GroupsList from "./groups-list";

type Props = {
  layout: "SLIDER" | "LIST";
  category?: string;
};

const SearchGroups = dynamic(
  () => import("./search-groups").then((mod) => mod.SearchGroups),
  { ssr: false },
);
const ExplorePageContent = ({ layout, category }: Props) => {
  const { isSearching, data, status, debounce } = useAppSelector(
    (state) => state.search,
  );

  return (
    <div className="flex flex-col">
      {isSearching || debounce || debounce?.length ? (
        <SearchGroups searching={isSearching} query={debounce} data={data} />
      ) : (
        status !== 200 &&
        (layout === "SLIDER" ? (
          <>
            <ExploreSlider
              label="fitness"
              text="Join top preforming fitness groups"
              query="fitness"
            />
            <ExploreSlider
              label="music"
              text="Join top preforming music groups"
              query="music"
            />
            <ExploreSlider
              label="lifestyle"
              text="Join top preforming lifestyle groups"
              query="lifestyle"
            />
          </>
        ) : (
          <GroupsList category={category as string} />
        ))
      )}
    </div>
  );
};

export default ExplorePageContent;
