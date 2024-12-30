"use client";
import { useCourse } from "@/hooks/course";
import React from "react";
import GlassModal from "../glass-modal";
import { Card, CardContent } from "@/components/ui/card";
import { FormGenerator } from "../form-generator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader } from "../loader";
import { DialogClose } from "@/components/ui/dialog";
import { BadgePlus } from "lucide-react";

type Props = {
  groupId: string;
};

const CourseCreate = ({ groupId }: Props) => {
  const {
    onSubmit,
    isPending,
    errors,
    groupInfo,
    privacy,
    setValue,
    register,
    buttonRef,
  } = useCourse({ groupId });
  return (
    groupInfo?.groupOwner && (
      <GlassModal
        title="Create Course"
        trigger={
          <span>
            <Card className="bg-[#101010] border-demonGreen/60 hover:bg-themeBlack transition duration-100 cursor-pointer  border-dashed aspect-square rounded-xl">
              <CardContent className="opacity-20 flex gap-x-2 p-0 justify-center items-center h-full">
                <BadgePlus className="text-white" size={16} /> 
                <p>Create Course</p>
              </CardContent>
            </Card>
          </span>
        }
        description="Create a course to share your knowledge with the world"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4 mt-5">
          <FormGenerator
            register={register}
            errors={errors}
            name="name"
            label="Course Name"
            placeholder="Course Name"
            inputType="input"
            type="text"
          />
          <FormGenerator
            register={register}
            errors={errors}
            name="description"
            label="Course Description"
            placeholder="Course Description"
            inputType="textarea"
            type="text"
          />
          <div className="grid gap-2 grid-cols-3">
            <Label className="col-span-3">Course Permission</Label>
            <Label htmlFor="r1">
              <span>
                <Input
                  className="hidden"
                  type="radio"
                  {...register("privacy")}
                  id="r1"
                  value="open"
                />
                <Card
                  className={cn(
                    privacy === "open" ? "bg-themeBlack" : "bg-transparent",
                    "py-5 flex justify-center border-demonGreen/60 font-bold text-themeTextGray cursor-pointer",
                  )}
                >
                  Open
                </Card>
              </span>
            </Label>

            <Label htmlFor="r2">
              <span>
                <Input
                  className="hidden"
                  type="radio"
                  {...register("privacy")}
                  id="r2"
                  value="private"
                />
                <Card
                  className={cn(
                    privacy === "private" ? "bg-themeBlack" : "bg-transparent",
                    "py-5 flex justify-center border-demonGreen/60 font-bold text-themeTextGray cursor-pointer",
                  )}
                >
                  Private
                </Card>
              </span>
            </Label>
            <div className="col-span-3">
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-red-500">
                    {message === "Required" ? "" : message}
                  </p>
                )}
                name="privacy"
                errors={errors}
              />
            </div>
          </div>
          <Label htmlFor="course-image" className="mt-5">
            <span>
              <Input
                className="hidden"
                type="file"
                {...register("image")}
                id="course-image"
              />
              <Card className="bg-transparent border-demonGreen/60 hover:bg-themeBlack transition duration-100 cursor-pointer  border-dashed aspect-video rounded-xl flex justify-center items-center">
                Upload Image
              </Card>
            </span>
            <ErrorMessage
              render={({ message }) => (
                <p className="text-red-500">
                  {message === "Required" ? "" : message}
                </p>
              )}
              name="image"
              errors={errors}
            />
          </Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="publish-mode"
              onCheckedChange={(e) => setValue("published", e)}
              className="data-[state=checked]:bg-demonGreen data-[state=unchecked]:bg-demonGray"
            />
            <Label htmlFor="publish-mode">Publish Course</Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-demonGreen border-demonGreen/60 hover:bg-themeBlack transition duration-100 cursor-pointer  border-dashed aspect-video rounded-xl flex justify-center items-center"
            variant={"outline"}
            disabled={isPending}
          >
            <Loader loading={isPending}>Create</Loader>
          </Button>

          <DialogClose asChild>
            <Button ref={buttonRef} className="hidden" type="button">
              Close Modal
            </Button>
          </DialogClose>
        </form>
      </GlassModal>
    )
  );
};

export default CourseCreate;
