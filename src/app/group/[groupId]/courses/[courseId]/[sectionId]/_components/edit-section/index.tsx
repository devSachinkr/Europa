import EditSectionForm from "@/components/forms/section";
import GradientText from "@/components/global/gradient-text";
import { SimpleModal } from "@/components/global/simple-modal";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";

type Props = {
  sectionId: string;
};

const EditSection = ({ sectionId }: Props) => {
  return (
    <SimpleModal
      title="Edit Section"
      description="You can edit the section name here"
      trigger={
        <Button className="bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold py-2 px-4 rounded-full gap-x-3 flex items-center">
          Edit
          <Pencil size={16} />
        </Button>
      }
    >
      <div className=" flex flex-col container items-left">
        <div className="flex flex-col gap-3 mb-5">

        <GradientText
          className="text-3xl text-themeTextWhite font-bold"
          element="H2"
        >
          Section Settings
        </GradientText>
        <p className="text-themeTextGray text-sm">
          You can edit the section name here, this action may take a few seconds
          to complete.
        </p>
          </div>
        <EditSectionForm sectionId={sectionId} />
      </div>
    </SimpleModal>
  );
};

export default EditSection;
