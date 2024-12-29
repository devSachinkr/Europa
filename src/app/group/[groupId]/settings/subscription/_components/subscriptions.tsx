'use client'
import SubscriptionCard from "@/components/subscription-card";
import { useAllSubscriptions } from "@/hooks/payment";

type Props = {
  groupId: string;
};

const Subscriptions = ({ groupId }: Props) => {
  const { data, mutate } = useAllSubscriptions({ groupId });
  return data?.status === 200 && data.data ? (
    data.data.map((subscription) => (
      <SubscriptionCard
        key={subscription.id}
        price={subscription.price?.toString() || "0"}
        members={`${data.count}`}
        onClick={() => mutate({ id: subscription.id })}
        active={subscription.active}
      />
    ))
  ) : (
    <></>
  );
};

export default Subscriptions;
