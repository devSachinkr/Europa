"use server";

import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const getStripeClientSecret = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 19900,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    if (paymentIntent) {
      return {
        data: paymentIntent.client_secret,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Failed to Load Form",
    };
  }
};

export const transferCommission = async ({
  stripeId,
}: {
  stripeId: string;
}) => {
  if (!stripeId) return { status: 404 };
  try {
    const res = await stripe.transfers.create({
      amount: 5000,
      currency: "inr",
      destination: stripeId,
    });
    if (res) {
      return { status: 201 };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const getActiveSubscription = async ({
  groupId,
}: {
  groupId: string;
}) => {
  try {
    if (!groupId) return { status: 404 };
    const res = await db.subscription.findFirst({
      where: {
        groupId,
        active: true,
      },
    });
    if (res) {
      return { status: 200, data: res };
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
