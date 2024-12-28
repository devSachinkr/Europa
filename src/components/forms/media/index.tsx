"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaGalleryForm } from "@/hooks/media";
import { BadgePlus } from "@/icons";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

type Props = {
  groupId: string;
};

const MediaGalleryForm = ({ groupId }: Props) => {
  const { onSubmit, errors, isPending, register } = useMediaGalleryForm({
    groupId,
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        name="videourl"
        label="Video URL"
        placeholder="https://www.loom.com/share/xxxxxxxxxxxxxxxxxxxx"
        register={register}
        errors={errors}
        type="text"
        inputType="input"
      />
      <Label htmlFor="media-gallery">
        <p>Or Upload Media</p>
        <span className="border-[1px] border-dashed flex flex-col justify-center items-center py-10 my-2 hover:bg-themeGray/50 cursor-pointer mt-3 rounded-lg border-demonGreen/70 hover:border-demonGreen">
          <Input
            type="file"
            id="media-gallery"
            multiple
            {...register("image")}
            className="hidden"
          />
          <BadgePlus />
          <p>Drag and drop or click to upload</p>
        </span>
        <ErrorMessage
          errors={errors}
          name="image"
          render={({ message }) => (
            <p className="text-xs text-red-500">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </Label>

      <p className="text-xs text-red-400 font-bold">
        Note: Paste only embed links of Media | Youtube, Loom | Othserwise it
        will not be added or work
      </p>
      <Button
        type="submit"
        className="mt-5 self-end bg-demonGreen text-white hover:bg-demonGreen/80 disabled:bg-demonGreen/40 disabled:hover:bg-demonGreen/40
                px-10  rounded-xl"
        disabled={isPending}
      >
        <Loader loading={isPending}>Update</Loader>
      </Button>
    </form>
  );
};

export default MediaGalleryForm;
