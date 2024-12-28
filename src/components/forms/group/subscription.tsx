"use client";
import { FormGenerator } from "@/components/global/form-generator";
import GlassModal from "@/components/global/glass-modal";
import { Loader } from "@/components/global/loader";
import SubscriptionCard from "@/components/subscription-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGroupSubscriptionForm } from "@/hooks/payment";
import { Tag } from "lucide-react";
import React from "react";

type Props = {
  groupId: string;
};

const GroupSubscriptionForm = ({ groupId }: Props) => {
  const { onSubmit, isPending, errors, register, variables } =
    useGroupSubscriptionForm({ groupId });
  return (
    <>
      <GlassModal
        trigger={
          <div>
            <Card className="flex rounded-xl text-themeGray gap-x-2 items-center cursor-pointer justify-center aspect-video border-dashed bg-themeBlack border-demonGreen/60 hover:border-demonGreen/80 p-5 hover:bg-themeBlack/80">
              <Tag />
              <p>Add Subscription</p>
            </Card>
          </div>
        }
        title="Add a Subscription"
        description="Create a subscription plan for your Europa group"
      >
        <form className="flex flex-col gap-y-3" onSubmit={onSubmit}>
          <FormGenerator
            errors={errors}
            register={register}
            name="price"
            label="Price"
            type="text"
            inputType="input"
            placeholder="Enter Price"
          />
          <Button
            className="w-full mt-4 bg-demonGreen text-white hover:bg-demonGreen/80 rounded-xl"
            type="submit"
            disabled={isPending}
          >
            <Loader loading={isPending}>Add</Loader>
          </Button>
        </form>
      </GlassModal>
      {isPending && variables && (
        <SubscriptionCard price={variables.price} members={"0"} />
      )}
    </>
  );
};

export default GroupSubscriptionForm;
