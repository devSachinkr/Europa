"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useSectionForm } from "@/hooks/section";
import React from "react";

type Props = {
  sectionId: string;
};

const EditSectionForm = ({ sectionId }: Props) => {
  const { errors, isPending, onSubmit, register } = useSectionForm({
    sectionId,
  });
  return (
    <form onSubmit={onSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        inputType="input"
        label="Section Name"
        name="name"
        placeholder="Enter Section Name"
        type="text"
      />
      <Button className=" bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold mt-5 px-4 rounded-full gap-x-3 flex items-center w-full">
        <Loader loading={isPending}>Save</Loader>
      </Button>
    </form>
  );
};

export default EditSectionForm;
