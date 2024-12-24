import StripeElements from "@/components/global/stripe/element";
import React from "react";
import PaymentForm from "./payment-form";

type Props = {
    userID: string;
    affiliate: boolean;
    stripeId: string;
};

const GroupForm = ({ affiliate, stripeId, userID }: Props) => {
    return (
        <StripeElements>
            <PaymentForm
                userID={userID}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElements>
    );
};

export default GroupForm;
