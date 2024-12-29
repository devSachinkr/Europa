"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import { useNavigation } from "@/hooks/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MenuProps = {
  orientation: "MOBILE" | "DESKTOP";
};

const Menu = ({ orientation }: MenuProps) => {
  const { section, onSetSection } = useNavigation();
  switch (orientation) {
    case "DESKTOP":
      return (
        <Card className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex  md:rounded-xl flex items-center justify-center w-fit">
          <CardContent className="p-0 flex gap-2">
            {EUROPA_CONSTANTS.groupPageMenu.map((menuItem) => (
              <Link
                href={menuItem.path}
                onClick={() => onSetSection(menuItem.path)}
                className={cn(
                  "rounded-xl flex gap-2 py-2 px-4 items-center",
                  section == menuItem.path
                    ? "bg-[#09090B] border-[#27272A]"
                    : "",
                )}
                key={menuItem.id}
              >
                {section == menuItem.path && String(menuItem.icon)}
                {menuItem.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      );

    case "MOBILE":
      return (
        <div className="flex flex-col mt-10">
          {EUROPA_CONSTANTS.groupPageMenu.map((menuItem) => (
            <Link
              href={menuItem.path}
              onClick={() => onSetSection(menuItem.path)}
              className={cn(
                "rounded-xl flex gap-2 py-2 px-4 items-center",
                section == menuItem.path ? "bg-themeGray border-[#27272A]" : "",
              )}
              key={menuItem.id}
            >
              <menuItem.icon />
              {menuItem.label}
            </Link>
          ))}
        </div>
      );
    default:
      return <></>;
  }
};

export default Menu;
