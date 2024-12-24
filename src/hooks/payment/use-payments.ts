"use client";
import { onCreateGroup } from "@/actions/group";
import { getStripeClientSecret, transferCommission } from "@/actions/payment";
import { GroupSchema } from "@/components/forms/group/schema";
import ToastNotify from "@/components/global/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const usePayments = ({
    userID,
    affiliate,
    stripeId,
}: {
    userID: string;
    affiliate: boolean;
    stripeId?: string;
}) => {
    const [isCategory, setIsCategory] = useState<string | undefined>(undefined);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const {
        reset,
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm<z.infer<typeof GroupSchema>>({
        resolver: zodResolver(GroupSchema),
        defaultValues: {
            category: "",
        },
    });

    const { data: Intent, isPending: creatingIntent } = useQuery({
        queryKey: ["payment-intent"],
        queryFn: getStripeClientSecret,
    });

    const { mutateAsync: createGroup, isPending } = useMutation({
        mutationFn: async ({ category, name }: z.infer<typeof GroupSchema>) => {
            if (!stripe || !elements || !Intent) return null;
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                Intent.data!,
                {
                    payment_method: {
                        card: elements.getElement(
                            CardElement,
                        ) as StripeCardElement,
                    },
                },
            );
            if (error) {
                return ToastNotify({
                    title: "Oops!",
                    msg: "Oops!, Something went wrong, Try again later!",
                });
            }
            if (paymentIntent?.status === "succeeded") {
                if (affiliate) {
                    await transferCommission({ stripeId: stripeId! });
                }
                const createNewGroup = await onCreateGroup({
                    userID,
                    data: {
                        category,
                        name,
                    },
                });
                if (createNewGroup && createNewGroup.status === 201) {
                    ToastNotify({
                        title: "Success",
                        msg: "Group created successfully",
                    });
                    router.push(
                        `/group/${createNewGroup.data?.group[0].id}/channel/${createNewGroup.data?.group[0].channel[0].id}`,
                    );
                }
                if (createNewGroup.status !== 201) {
                    reset();
                    return ToastNotify({
                        title: "Oops!",
                        msg:
                            createNewGroup.message ||
                            "Something went wrong, May be USER ID is Missing",
                    });
                }
            }
        },
    });

    const onSubmit = handleSubmit(async ({ category, name }) => {
        await createGroup({
            category,
            name,
        });
    });

    useEffect(() => {
        const category = watch(({ category }) => {
            if (category) {
                setIsCategory(category);
            }
        });
        return category.unsubscribe();
    }, [watch]);
    return {
        onSubmit,
        isPending,
        errors,
        register,
        isCategory,
        creatingIntent,
    };
};
