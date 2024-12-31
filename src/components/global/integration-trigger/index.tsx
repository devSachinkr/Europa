'use client'
import React from "react";
import { SimpleModal } from "../simple-modal";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon, CloudIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import StripeConnect from "./stripe-connect";

type Props = {
  connection: {
    [key in "stripe"]: boolean;
  };
  title: string;
  description: string;
  logo: string;
  name: string;
  groupId: string;
};

const IntegrationTrigger = ({
  connection,
  title,
  description,
  logo,
  groupId,
}: Props) => {
  return (
    <>
      <SimpleModal
        title={title}
        type="Integration"
        logo={logo}
        description={description}
        trigger={
          <Card className="px-3 py-2 cursor-pointer flex gap-2 bg-themeBlack border-themeGray">
            <CloudIcon />
            {connection["stripe"] ? "Connected" : "Connect"}
          </Card>
        }
      >
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-2">
          <h2>Stripe would like to access</h2>
          {[
            "Payment and bank account information",
            "Products and services",
            "Business and legal information",
            "Create and update subscriptions",
          ].map((i, idx) => (
            <div key={idx} className="flex gap-2 items-center pl-3">
              <CheckCircleIcon size={18} />
              <p>{i}</p>
            </div>
          ))}

          <div className="flex justify-between mt-10">
            <Button className="bg-themeBlack text-themeTextGray  hover:text-themeBlack border-themeDarkGray">
              Learn More
            </Button>
            <StripeConnect connected={connection["stripe"]} groupId={groupId} />
          </div>
        </div>
      </SimpleModal>
    </>
  );
};

export default IntegrationTrigger;
