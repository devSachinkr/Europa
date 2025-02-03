"use client";
import { Button } from "@/components/ui/button";
import { Loader } from "../loader";

type Props = {
  connected: boolean;
  groupId: string;
};

const StripeConnect = ({ connected }: Props) => {
//   const { stripeAccPending, stripeConnect } = useStripeAccount({ groupId });
  return (
    <Button
      className="bg-demonGreen/60 hover:bg-demonGreen/80 text-white font-bold py-2 px-4 rounded-full gap-x-3"
    >
      <Loader loading>
        {connected ? "Connected" : "Connect to Stripe"}
      </Loader>
    </Button>
  );
};

export default StripeConnect;
