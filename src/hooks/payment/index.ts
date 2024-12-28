'use client'
import { getGroupsChannels, getGroupSubscription, joinGroup } from "@/actions/group";
import {
  activateSubscription,
  createNewGroupSubscription,
  getActiveSubscription,
  getSubscriptionPaymentIntent,
} from "@/actions/payment";
import { GroupSubscriptionSchema } from "@/components/forms/group/schema";
import ToastNotify from "@/components/global/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useStripeElements = () => {
  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

  return { StripePromise };
};

export const useActiveSubscription = ({ groupId }: { groupId: string }) => {
  const { data } = useQuery({
    queryKey: ["active-subscription"],
    queryFn: async () => {
      return getActiveSubscription({ groupId });
    },
  });

  return { data };
};

export const useJoinFree = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const joinFreeGroup = async () => {
    const member = await joinGroup({ groupId });
    if (member?.status === 200) {
      const channels = await getGroupsChannels({ groupId });
      router.push(`/group/${groupId}/channel/${channels?.data?.[0].id}`);
    }
  };

  return { joinFreeGroup };
};

export const useJoinGroup = ({ groupId }: { groupId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const { data: Intent } = useQuery({
    queryKey: ["group-payment-intent"],
    queryFn: () => {
      return getSubscriptionPaymentIntent({ groupId });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["join-group"],
    mutationFn: async () => {
      if (!stripe || !elements || !Intent) return;
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        Intent.secret!,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        },
      );
      if (error) {
        return ToastNotify({
          title: "Oops!",
          msg: " Payment Failed | Please Try Again",
        });
      }
      if (paymentIntent.status === "succeeded") {
        ToastNotify({
          title: "Success",
          msg: " Payment Successful | You are now a member of this group",
        });
        const member = await joinGroup({ groupId });
        if (member?.status === 200) {
          const channels = await getGroupsChannels({ groupId });
          router.push(`/group/${groupId}/channel/${channels?.data?.[0].id}`);
        }
      }
    },
  });
  const pay = () => mutate();
  return {
    pay,
    isPending,
  };
};

export const useGroupSubscriptionForm = ({ groupId }: { groupId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof GroupSubscriptionSchema>>({
    mode: "onChange",
    resolver: zodResolver(GroupSubscriptionSchema),
  });
  const client = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: ({ price }: z.infer<typeof GroupSubscriptionSchema>) => {
      return createNewGroupSubscription({ groupId, price: price });
    },
    onMutate: () => reset(),
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["group-subscriptions"],
      });
    },
    onSuccess: (data) => {
      return ToastNotify({
        title: data?.status === 200 ? "Success" : "Oops!",
        msg: data?.message,
      });
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    await mutate({ ...data });
  });
  return {
    onSubmit,
    isPending,
    errors,
    register,
    variables,
  };
};


export const useAllSubscriptions = ({ groupId }: { groupId: string }) => {
  const { data } = useQuery({
    queryKey: ["group-subscriptions"],
    queryFn: () => {
      return getGroupSubscription({ groupId });
    },
  });
  const client = useQueryClient();

 const {mutate} = useMutation({
     mutationFn:((data:{id:string})=>{
      return activateSubscription({ id: data.id })
     }),
     onSuccess:(data)=>{
      return ToastNotify({
        title: data?.status === 200 ? "Success" : "Oops!",
        msg: data?.message,
      });
     },
     onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["group-subscriptions"],
      });
    },
 });

  return { data , mutate };
};