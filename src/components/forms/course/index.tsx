"use client";
import { HtmlParser } from "@/components/global/html-parser";
import { Loader } from "@/components/global/loader";
import BlockTextEditor from "@/components/global/rich-text-editor";
import { Button } from "@/components/ui/button";
import { useCourseContent, useCourseSectionInfo } from "@/hooks/course";
import React from "react";

type Props = {
  groupUserId: string;
  sectionId: string;
  userId: string;
};

const CourseContentForm = ({ groupUserId, sectionId, userId }: Props) => {
  const { sectionInfo } = useCourseSectionInfo({ sectionId });
  const {
    isPending,
    errors,
    onSubmit,
    setOnHtmlDescription,
    setJsonDescription,
    editor,
    onEditDescription,
    setDescription,
  } = useCourseContent({
    sectionId,
    description: sectionInfo?.data?.content || null,
    htmlDescription: sectionInfo?.data?.htmlContent || null,
    jsonDescription: sectionInfo?.data?.JsonContent || null,
  });

  return groupUserId === userId ? (
    <form onSubmit={onSubmit} className="flex flex-col p-5" ref={editor}>
      <BlockTextEditor
        onEdit={onEditDescription}
        max={10000}
        inline
        min={100}
        disabled={userId !== groupUserId}
        name="jsoncontent"
        errors={errors}
        setContent={setJsonDescription}
        content={JSON.parse(sectionInfo?.data?.JsonContent || "{}")}
        htmlContent={sectionInfo?.data?.htmlContent || ""}
        setHtmlContent={setOnHtmlDescription}
        textContent={sectionInfo?.data?.content || ""}
        setTextContent={setDescription}
      />
      {onEditDescription && (
        <Button
          className="bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold py-2 px-4 rounded-full gap-x-3"
          type="submit"
          disabled={isPending}
        >
          <Loader loading={isPending}>Save</Loader>
        </Button>
      )}
    </form>
  ) : (
    <HtmlParser
      html={sectionInfo?.data?.htmlContent || "NO Content Available"}
    />
  );
};

export default CourseContentForm;
