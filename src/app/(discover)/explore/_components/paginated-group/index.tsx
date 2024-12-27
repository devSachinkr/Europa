"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";
import GroupCard from "../group-card";

const PaginatedGroups = () => {
  const { data } = useAppSelector((state) => state.infiniteScroll);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((i: any) => <GroupCard key={i.id} {...i} />);
};

export default PaginatedGroups;
