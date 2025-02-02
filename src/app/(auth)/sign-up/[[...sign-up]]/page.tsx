import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div>
      <SignUp afterSignOutUrl={"/"} fallbackRedirectUrl={"/"} />
    </div>
  );
};

export default page;
