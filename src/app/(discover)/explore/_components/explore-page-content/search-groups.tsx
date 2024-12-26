import { Loader } from "@/components/global/loader";
import { GroupStateProps } from "@/redux/slices/search";
import React from "react";
import GroupCard from "../group-card";

type Props = {
  searching?: boolean;
  query?: string;
  data: GroupStateProps[];
};

export const SearchGroups = ({ searching, query, data }: Props) => {
  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-36">
      <Loader
        loading={searching || false}
        className="lg:col-span-3 md:col-span-2"
      >
        {data.length > 0 ? (
          data.map((item, idx) => <GroupCard key={idx} {...item} />)
        ) : (
          <span className="text-gradient text-center text-[3rem] font-bold w-full">
            No results found
          </span>
        )}
      </Loader>
      {data.length > 5 && (
        // <InfiniteScrollObserver
        //   action="GROUPS"
        //   indentifier={query as string}
        //   paginate={data.length}
        //   search
        // >
        //     <PaginatedGroups/>
        // </InfiniteScrollObserver>
        <></>
      )}
    </div>
  );
};
