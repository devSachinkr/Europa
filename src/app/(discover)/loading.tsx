import { Loader } from "@/components/global/loader";
import React from "react";
const loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader loading={true} /> 
    </div>
  );
};

export default loading;
