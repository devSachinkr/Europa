/* eslint-disable @next/next/no-img-element */
import { Card } from "@/components/ui/card";
import { truncateString } from "@/lib/utils";
import Link from "next/link";
import groupPlaceholderSvg from "../../../../../public/assets/group_placeholder.svg";
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

const GroupCard = ({ id, description, name, preview, thumbnail }: Props) => {
  console.log(thumbnail, "🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍");
  return (
    <Link href={`/about/${id}`}>
      <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
        <img
          src={
            preview ||
            (thumbnail?.length&&
              `https://ucarecdn.com/${thumbnail as string}/`) ||
            groupPlaceholderSvg.src
          }
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
