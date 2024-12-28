import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type Props = {
  price: string;
  members: string;
  optimistic?: boolean;
  onClick?: () => void;
  active?: boolean;
};

const SubscriptionCard = ({
  price,
  members,
  optimistic,
  onClick,
  active,
}: Props) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "bg-themeBlack cursor-pointer text-themeTextGray flex flex-col gap-y-3 justify-center aspect-video items-center",
        optimistic && "bg-opacity-60",
        active ? "border-purple-800 border-2" : "border-none",
      )}
    >
      <h3 className="text-2xl text-gradient">
        ₹{price}
        <span className="text-themeTextGray">/Month</span>
      </h3>
      <div className="flex items-center gap-x-2 text-sm">
        <User size={20} />
        <p>{members} Members</p>
      </div>
    </Card>
  );
};

export default SubscriptionCard;
