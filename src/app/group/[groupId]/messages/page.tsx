import { Empty } from "@/icons";
import React from "react";

const page = async () => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-y-3">
      <Empty />
      <p className="text-themeTextGray">No chats selected</p>
    </div>
  );
};

export default page;
