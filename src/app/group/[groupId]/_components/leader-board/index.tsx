import GradientText from "@/components/global/gradient-text";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  light?: boolean;
};

const LeaderBoardCard = ({ light }: Props) => {
  return (
    <Card
      className={cn(
        "border-themeGray lg:sticky lg:top-0 mt-10 rounded-xl p-5 overflow-hidden",
        light ? " border-themeGray bg-[#1A1A1D]" : "bg-themeBlack",
      )}
    >
      <GradientText element="H2" className="text-2xl font-semibold text-white mb-2">
        LeaderBoard <br /> {"( 30 days )"}
      </GradientText>
      <p className="text-themeTextGray text-sm">
        See who performed the best in the last 30 days
      </p>
    </Card>
  );
};

export default LeaderBoardCard;
