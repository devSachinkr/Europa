"use client";
import { useCourse } from "@/hooks/course";
import React from "react";

type Props = {
  groupId: string;
};

const CourseCreate = ({ groupId }: Props) => {
  const {} = useCourse({ groupId });
  return <div>CourseCreate</div>;
};

export default CourseCreate;
