import React from "react";
import { Skeleton as SkeletonLoader } from "@/components/ui/skeleton";
type Props = {
  element: "CARD" | "POST";
};

const Skeleton = ({ element }: Props) => {
  switch (element) {
    case "CARD": {
      return (
        <div className="flex flex-col gap-y-3 rounded-xl bg-[#181818] overflow-hidden">
          <SkeletonLoader className="h-[200px] w-full bg-[#202020]" />
          <SkeletonLoader className="h-[40px] w-7/12 bg-[#202020]" />
          <SkeletonLoader className="h-[30px] w-4/12 bg-[#202020]" />
        </div>
      );
    }
    case "POST": {
      return (
        <div className="w-full pt-4 bg-[#1C1C1E] text-white rounded-lg border border-[#27272A] overflow-hidden">
          <div className="flex items-center mb-3 px-4">
            <SkeletonLoader className="h-12 w-12 mr-4 rounded-full bg-[#202020]" />
            <div>
              <SkeletonLoader className="h-5 w-24  rounded-md bg-[#202020] mb-1" />
              <SkeletonLoader className="h-4 w-40 rounded-md bg-[#202020] " />
            </div>
          </div>
          <SkeletonLoader className="h-[280px] w-full  bg-[#202020]" />
          <div className="flex items-center gap-3 border-t border-[#27272A] px-6 py-2">
            <SkeletonLoader className="h-4 w-20 rounded-md bg-[#202020]" />
            <SkeletonLoader className="h-4 w-20 rounded-md bg-[#202020]" />
            <span className="h-4 w-20 rounded-md bg-[#202020]" />
          </div>
        </div>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default Skeleton;
