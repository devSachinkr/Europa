"use client";
import { FormGenerator } from "@/components/global/form-generator";
import GradientText from "@/components/global/gradient-text";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { usePayments } from "@/hooks/payment/use-payments";
import { ErrorMessage } from "@hookform/error-message";
import { CardElement } from "@stripe/react-stripe-js";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

type Props = {
    affiliate: boolean;
    stripeId: string;
    userID: string;
};

const GroupList = dynamic(
    () =>
        import("@/components/global/group-list").then(
            (compo) => compo.GroupList,
        ),
    {
        ssr: false,
    },
);
const PaymentForm = ({ affiliate, userID }: Props) => {
    const {
        onSubmit,
        isPending,
        errors,
        register,
        isCategory,
        creatingIntent,
    } = usePayments({
        userID,
        affiliate,
    });
    return (
        <Loader loading={creatingIntent}>
            <form onSubmit={onSubmit} className="pt-5">
                <GroupList
                    selected={isCategory}
                    register={register}
                    label="Select Category"
                    slidesOffsetBefore={28}
                />
                <div className="px-7 mb-2">
                    <ErrorMessage
                        errors={errors}
                        name="category"
                        render={({ message }) => (
                            <p className="text-red-400">
                                {message === "Required" ? "" : message}
                            </p>
                        )}
                    />
                </div>
                <div className="px-7">
                    <FormGenerator
                        register={register}
                        name="name"
                        errors={errors}
                        inputType="input"
                        type="text"
                        label="Group Name"
                        placeholder="Europa communities...."
                    />
                </div>
                <div className="px-7 my-3">
                    <CardElement
                        className="bg-themeBlack border-[1px] border-themeGray outline-none rounded-lg p-3"
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#B4B0AE",
                                    "::placeholder": {
                                        color: "#B4B0AE",
                                    },
                                },
                            },
                        }}
                    />
                </div>
                <div className="px-7 flex flex-col gap-5">
                    <p className="text-sm text-themeTextGray">
                        Cancel Anytime With 1-click, By clicking below, you
                        accept our terms.
                    </p>
                    <Link
                        className="text-sm flex items-center justify-end gap-2 text-themeTextGray"
                        href={"/explore"}
                    >
                        <GradientText>Skip for now</GradientText>

                        <ArrowRight
                            className="text-demonGreen font-bold"
                            size={15}
                        />
                    </Link>
                    <Button
                        className="bg-demonGreen  hover:bg-demonGreen/80 text-white"
                        type="submit"
                    >
                        <Loader loading={isPending}>Get Started</Loader>
                    </Button>
                </div>
            </form>
        </Loader>
    );
};

export default PaymentForm;
