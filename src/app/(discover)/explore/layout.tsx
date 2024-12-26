import { authUser } from "@/actions/auth";
import BackDropGradient from "@/components/global/back-drop-blur";
import GradientText from "@/components/global/gradient-text";
import { GroupList } from "@/components/global/group-list";
import Search from "@/components/global/search";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await authUser();
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col items-center mt-36 px-10">
        <GradientText
          className="text-[90px] font-semibold leading-none"
          element="H2"
        >
          Explore Groups
        </GradientText>
        <div className="text-themeTextGray leading-none pt-2">
          or
          <Link
            href={user.status === 200 ? `/group/create` : "/sign-in"}
            className="underline"
          >
            Create a Group
          </Link>
        </div>
        <BackDropGradient
          className="w-4/12 md:w-5/12 xl:w-3/12 xl:h-2/6"
          container="items-center"
        >
          <Search
            placeholder="Search for any group"
            searchType="GROUPS"
            glass
            inputStyle="lg:w-[500px] text-lg h-auto z-[9999]"
            className="rounded-3xl border-themeGray py-2 px-5 mt-10 mb-3"
          />
          <div className="w-full md:w-[800px]">
            <GroupList overlay route />
          </div>
        </BackDropGradient>
      </div>
      {children}
    </div>
  );
};

export default layout;
