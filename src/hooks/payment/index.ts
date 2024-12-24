import { loadStripe } from "@stripe/stripe-js";

export const useStripeElements = () => {
    const StripePromise = async () =>
        await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

    return { StripePromise };
};
