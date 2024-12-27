"use client";
import { useGroupList } from "@/hooks/group";
import React from "react";
import GroupCard from "../group-card";
import InfiniteScrollObserver from "@/components/global/infinite-scroll-observer";
import PaginatedGroups from "../paginated-group";

type Props = {
  category: string;
  
};

const GroupsList = ({ category }: Props) => {
  const { groups, status } = useGroupList({
    query: "groups",
  });
  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
      {status === 200 ? (
        groups.map((group) => <GroupCard key={group.id} {...group} />)
      ) : (
        <div className="text-center text-gradient text-3xl">
          No groups found
        </div>
      )}
      {groups && groups.length > 5 && (
        <InfiniteScrollObserver
          action="GROUPS"
          indentifier={category as string}
          paginate={groups.length}
          search
        >
          <PaginatedGroups />
        </InfiniteScrollObserver>
      )}
    </div>
  );
};

export default GroupsList;
