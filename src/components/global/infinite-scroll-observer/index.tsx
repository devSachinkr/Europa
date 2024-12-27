"use client";
import { useInfiniteScroll } from "@/hooks/infinite-scroll";
import React from "react";
import Skeleton from "../skeleton";

type Props = {
  action: "GROUPS" | "POSTS";
  indentifier: string;
  paginate: number;
  search?: boolean;
  children?: React.ReactNode;
  loading?: "POST";
};

const InfiniteScrollObserver = ({
  action,
  indentifier,
  paginate,
  search,
  children,
  loading,
}: Props) => {
    const {
        observerElement,
        isFetching,
    }= useInfiniteScroll({
        action,
        indentifier,    
        paginate,
        search,
    })
  return <>
     {children}
     <div ref={observerElement} >
        {isFetching && <Skeleton element={loading || "CARD"} />} 
     </div>
  </>;
};

export default InfiniteScrollObserver;
