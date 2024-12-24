"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeElements } from "@/hooks/payment";
type Props = {
    children: React.ReactNode;
};

const StripeElements = ({ children }: Props) => {
    const { StripePromise } = useStripeElements();
    const promise = StripePromise();
    return promise && <Elements stripe={promise}>{children}</Elements>;
};

export default StripeElements;
