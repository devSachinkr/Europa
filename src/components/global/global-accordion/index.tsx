import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  edit?: boolean;
  editable?: React.ReactNode;
  onEdit?: () => void;
};

const GlobalAccordion = ({
  id,
  title,
  children,
  ref,
  edit,
  editable,
  onEdit,
}: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value={id}>
        <AccordionTrigger
          className="font-bold capitalize"
          onDoubleClick={onEdit}
          ref={ref}
        >
          {edit ? editable : title}
        </AccordionTrigger>
        {children}
      </AccordionItem>
    </Accordion>
  );
};

export default GlobalAccordion;
