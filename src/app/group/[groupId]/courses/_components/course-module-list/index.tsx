"use client";
import GlobalAccordion from "@/components/global/global-accordion";
import { IconRenderer } from "@/components/global/icon-renderer";
import { Loader } from "@/components/global/loader";
import { AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCourseModuleList } from "@/hooks/course-module";
import { EmptyCircle, PurpleCheck } from "@/icons";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

type Props = {
  groupId: string;
  courseId: string;
};

const CourseModuleList = ({ groupId, courseId }: Props) => {
  const {
    modules,
    groupInfo,
    isPending,
    isPendingSection,
    onEditModule,
    onEditSection,
    edit,
    editSection,
    activeSection,
    moduleId,
    sectionVariables,
    createSectionVariables,
    triggerRef,
    contentRef,
    inputRef,
    variables,
    pathname,
    createSection,
    isPendingCreateSection,
    setActiveSection,
    sectionInputRef,
  } = useCourseModuleList({ groupId, courseId });
  return (
    <div className="flex flex-col">
      {modules?.status === 200 &&
        modules.data?.map((module) => (
          <GlobalAccordion
            key={module.id}
            ref={triggerRef}
            editable={
              <Input
                ref={inputRef}
                className="bg-themeBlack border-demonGreen/60"
              />
            }
            onEdit={() => onEditModule({ id: module.id })}
            id={module.id}
            title={isPending ? (variables?.content as string) : module.title}
          >
            <AccordionContent className="flex flex-col gap-y-2 px-3">
              {module.section.length ? (
                module.section.map((section) => (
                  <Link
                    ref={contentRef}
                    key={section.id}
                    href={`/group/${groupId}/courses/${courseId}/${section.id}`}
                    className="flex gap-x-3 items-center capitalize"
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.complete ? <PurpleCheck /> : <EmptyCircle />}
                    <IconRenderer
                      icon={section.icon}
                      mode={
                        pathname.split("/").pop() === section.id
                          ? "DARK"
                          : "LIGHT"
                      }
                    />
                    {editSection && activeSection === section.id ? (
                      <Input
                        ref={sectionInputRef}
                        className="flex-1 bg-transparent border-none p-0"
                      />
                    ) : isPendingSection && activeSection === section.id ? (
                      sectionVariables?.content
                    ) : (
                      section.name
                    )}
                  </Link>
                ))
              ) : (
                <></>
              )}
              {groupInfo?.groupOwner && (
                <>
                  {isPendingCreateSection && createSectionVariables && (
                    <Link
                      onClick={() =>
                        setActiveSection(createSectionVariables?.sectionId)
                      }
                      className="flex gap-x-3 items-center "
                      href={`/group/${groupId}/courses/${courseId}/${createSectionVariables?.sectionId}`}
                    >
                      <EmptyCircle />
                      <IconRenderer
                        icon={"doc"}
                        mode={
                          pathname.split("/").pop() === activeSection
                            ? "LIGHT"
                            : "DARK"
                        }
                      />
                      New Section
                    </Link>
                  )}
                  <Button
                    onClick={() =>
                      createSection({
                        moduleId: module.id,
                        sectionId: v4(),
                      })
                    }
                    className="bg-demonGreen border-demonGreen/60 hover:bg-demonGreen/80 transition duration-100 cursor-pointer  border-dashed aspect-video rounded-xl flex justify-center items-center"
                    disabled={isPendingCreateSection}
                  >
                    <Plus />
                  </Button>
                </>
              )}
            </AccordionContent>
          </GlobalAccordion>
        ))}
    </div>
  );
};

export default CourseModuleList;