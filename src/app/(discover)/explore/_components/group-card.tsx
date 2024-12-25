import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import groupPlaceholderSvg from "../../../../../public/assets/group_placeholder.svg";
import { truncateString } from "@/lib/utils";
type Props = {
  id: string;
  createdAt: Date;
  userId: string;
  category: string;
  description?: string | null;
  privacy: "PUBLIC" | "PRIVATE";
  thumbnail?: string | null;
  name: string;
  preview?: string;
};

const GroupCard = ({
  id,
  description,
  name,
  preview,
}: Props) => {
  return (
    <Link href={`/about/${id}`}>
      <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
        <Image
          src={preview || groupPlaceholderSvg}
          alt="thumbnail"
          className="w-full"
          width={200}
          height={200}
        />
        <div className="p-6">
          <h3 className="text-lg text-themeTextGray font-bold">{name}</h3>
          <p className="text-base text-themeTextGray">
            {description && truncateString({ str: description })}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default GroupCard;
