import { useActiveSubscription, useJoinFree } from "@/hooks/payment";
import React from "react";
import GlassModal from "../glass-modal";
import { Button } from "@/components/ui/button";
import StripeElements from "../stripe/element";
import JoinGroupPaymentForm from "./join-group-payment-form";

type Props = {
  groupId: string;
  owner: boolean;
};

const JoinGroupButton = ({ groupId, owner }: Props) => {
  const { data } = useActiveSubscription({
    groupId,
  });
  const { joinFreeGroup } = useJoinFree({
    groupId,
  });

  if (!owner) {
    if (data?.status === 200) {
      return (
        <GlassModal
          trigger={
            <Button className="w-full p-10" variant="ghost">
              <p>Join ${data.data?.price}/month</p>
            </Button>
          }
          title="Join This Group"
          description="Pay now to join this community"
        >
          <StripeElements>
            <JoinGroupPaymentForm groupId={groupId} />
          </StripeElements>
        </GlassModal>
      );
    }
    return (
      <Button onClick={joinFreeGroup} className="w-full p-10" variant="ghost">
        Join Now
      </Button>
    );
  }
  return (
    <Button disabled={owner} className="w-full p-10 text-lg text-gradient font-semibold" variant="ghost">
      Owner
    </Button>
  );
};

export default JoinGroupButton;
