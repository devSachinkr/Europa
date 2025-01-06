import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil } from "lucide-react";
import React from "react";
import { SimpleModal } from "../simple-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormGenerator } from "../form-generator";
import { Loader } from "../loader";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  setModuleId?: (id: string) => void;
  updateModuleName?: () => void;
  register?: UseFormRegister<{
    title: string;
  }>;
  errors?: FieldErrors<{
    title: string;
  }>;
  isPending?: boolean;
};

const GlobalAccordion = ({
  id,
  title,
  children,
  ref,
  setModuleId,
  updateModuleName,
  errors,
  register,
  isPending,
}: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value={id}>
        <AccordionTrigger
          className="font-bold capitalize flex justify-between"
          ref={ref}
        >
          {title}
          <div>
            <SimpleModal
              trigger={
                <div className="flex  items-center p-[5px] bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold  rounded-full aspect-square">
                  {setModuleId && (
                    <Pencil size={16} onClick={() => setModuleId(id)} />
                  )}
                </div>
              }
            >
              <Card className="bg-background border-none">
                <CardHeader>
                  <CardTitle>
                    <p className="text-3xl text-themeTextWhite font-bold text-gradient">
                      Module Settings
                    </p>
                  </CardTitle>
                  <CardDescription>
                    You can edit the module name here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {register && errors && (
                    <FormGenerator
                      register={register}
                      errors={errors}
                      inputType="input"
                      label="Module Name"
                      name="title"
                      placeholder="Enter Module Name"
                      type="text"
                    />
                  )}
                  <Button
                    className="bg-demonGreen border-demonGreen/60 hover:bg-demonGreen/80 transition duration-100 cursor-pointer  border-dashed aspect-video rounded-xl flex justify-center items-center"
                    onClick={updateModuleName}
                  >
                    <Loader loading={isPending || false}>Save</Loader>
                  </Button>
                </CardContent>
              </Card>
            </SimpleModal>
          </div>
        </AccordionTrigger>
        {children}
      </AccordionItem>
    </Accordion>
  );
};

export default GlobalAccordion;
