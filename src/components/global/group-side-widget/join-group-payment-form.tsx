import { Button } from "@/components/ui/button";
import { useJoinGroup } from "@/hooks/payment";
import { CardElement } from "@stripe/react-stripe-js";
import React from "react";
import { Loader } from "../loader";

type Props = {
  groupId: string;
};

const JoinGroupPaymentForm = ({ groupId }: Props) => {
  const { isPending, pay } = useJoinGroup({ groupId });
  return (
    <div className="flex flex-col gap-y-3">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#B480AE",
              "::placeholder": {
                color: "#B4B0AE",
              },
            },
          },
        }}
        className="bg-themeBlack border-[1px] border-themeGray  outline-none rounded-lg p-3"
      />

      <Button disabled={isPending} onClick={pay} className="w-full">
        <Loader loading={isPending}>Pay Now</Loader>
      </Button>
    </div>
  );
};

export default JoinGroupPaymentForm;
