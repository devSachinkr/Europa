"use client";
import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { useSectionNav } from "@/hooks/section";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  sectionId: string;
};

const SectionNav = ({ sectionId }: Props) => {
  const { isPending, mutate, sectionInfo } = useSectionNav({ sectionId });
  if (sectionInfo?.status !== 200) return <></>;
  return (
    <div className="flex justify-between  p-5 overflow-y-auto items-center">
      <div>
        <p className="text-themeTextGray">Course Title</p>
        <GradientText
          className="text-3xl text-themeTextWhite font-bold"
          element="H2"
        >
          {sectionInfo?.data?.name}
        </GradientText>
      </div>

      <div>
        <Button
          className="bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold py-2 px-4 rounded-full gap-x-3"
          onClick={() => mutate()}
        >
          <Check size={16} />
          {isPending
            ? "Completed"
            : !sectionInfo?.data?.complete
              ? "Mark as Complete"
              : "Completed"}
        </Button>
      </div>
    </div>
  );
};

export default SectionNav;
