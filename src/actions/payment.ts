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

export const getSubscriptionPaymentIntent = async ({
  groupId,
}: {
  groupId: string;
}) => {
  try {
    const res = await db.subscription.findFirst({
      where: {
        groupId,
        active: true,
      },
      select: {
        price: true,
        Group: {
          select: {
            User: {
              select: {
                stripeId: true,
              },
            },
          },
        },
      },
    });
    if (res && res.price) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: res.price * 100,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      if (paymentIntent) {
        return {
          secret: paymentIntent.client_secret,
          status: 200,
        };
      }
    }
    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const createNewGroupSubscription = async ({
  groupId,
  price,
}: {
  groupId: string;
  price: string;
}) => {
  try {
    if (!groupId) return { status: 404 };
    const res = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        subscription: {
          create: {
            price: parseInt(price),
          },
        },
      },
    });
    if (res) {
      return { status: 200, message: "Subscription Created" };
    }
    return { status: 400, message: "Failed to Create Subscription" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const activateSubscription = async ({ id }: { id: string }) => {
   if (!id) return { status: 404 };
  try {
     const status = await db.subscription.findUnique({
       where: {
         id,
       },
       select: {
         active: true,
       },
     });
     if (status) {
       if (status.active) {
         return { status: 200, message: "Plan already active" };
       }
       if (!status.active) {
         const current = await db.subscription.findFirst({
           where: {
             active: true,
           },
           select: {
             id: true,
           },
         });
         if (current && current.id) {
           const deactivate = await db.subscription.update({
             where: {
               id: current.id,
             },
             data: {
               active: false,
             },
           });

           if (deactivate) {
             const activateNew = await db.subscription.update({
               where: {
                 id,
               },
               data: {
                 active: true,
               },
             });

             if (activateNew) {
               return {
                 status: 200,
                 message: "New plan activated",
               };
             }
           }
         } else {
           const activateNew = await db.subscription.update({
             where: {
               id,
             },
             data: {
               active: true,
             },
           });

           if (activateNew) {
             return {
               status: 200,
               message: "New plan activated",
             };
           }
         }
       }
     }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
