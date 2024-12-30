"use client";
import GradientText from "@/components/global/gradient-text";
import { Card } from "@/components/ui/card";
import { useCourseInfo } from "@/hooks/course";
import { truncateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  groupId: string;
};

const CourseList = ({ groupId }: Props) => {
  const { courses } = useCourseInfo({ groupId });
  if (courses?.status !== 200) {
    return <></>;
  }
  return courses.data?.map((course) => (
    <Link key={course.id} href={`/group/${groupId}/courses/${course.id}`}>
      <Card className="bg-transparent border-themeGray h-full rounded-xl overflow-hidden">
        <Image
          src={`https://ucarecdn.com/${course.thumbnail}/`}
          alt={course.name}
          className="h-4/6 w-full opacity-60 "
          width={300}
          height={300}
        />
        <div className="h-2/6 flex flex-col  justify-center pl-5">
          <GradientText element="H2" className="text-lg font-semibold">
            {course.name}
          </GradientText>
          <p className="text-sm text-themeTextGray">
            {truncateString({ str: course.description })}
          </p>
        </div>
      </Card>
    </Link>
  ));
};

export default CourseList;
