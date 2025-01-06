"use client";
import GlobalAccordion from "@/components/global/global-accordion";
import { Button } from "@/components/ui/button";
import { useCourseModule } from "@/hooks/course-module";
import { Plus, PlusCircle } from "lucide-react";
import React from "react";

type Props = {
  groupId: string;
  courseId: string;
};

const CreateCourseModule = ({ groupId, courseId }: Props) => {
  const { groupInfo, onSubmit, isPending, variables } = useCourseModule({
    groupId,
    courseId,
  });

  if (!groupInfo?.groupOwner) return <></>;
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-end">
        <PlusCircle
          onClick={onSubmit}
          className="text-themeTextGray cursor-pointer hover:text-demonGreen/80"
        />
      </div>
      {variables && isPending && (
        <GlobalAccordion  id={variables.moduleId} title={variables.title}>
          <Button
            variant={"outline"}
            className="bg-transparent border-demonGreen/60 hover:bg-themeBlack transition duration-100 cursor-pointer  border-dashed aspect-video rounded-xl flex justify-center items-center"
          >
            <Plus />
          </Button>
        </GlobalAccordion>
      )}
    </div>
  );
};

export default CreateCourseModule;
