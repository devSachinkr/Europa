

import React from "react";

type Props = {
  params: Promise<{
    groupId: string;
    courseId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { groupId, courseId } = await params;
  
  return <div>page</div>;
};

export default page;
