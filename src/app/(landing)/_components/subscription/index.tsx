import BackDropGradient from "@/components/global/back-drop-blur";
import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Subscription = () => {
  return (
    <div
      className="w-full pt-20 flex flex-col items-center gap-3 "
      id="pricing"
    >
      <BackDropGradient className="w-8/12 h-full opacity-40 flex flex-col items-center">
        <GradientText
          element="H2"
          className="text-[50px] md:text-[70px] lg:text-[80px] xl:text-[90px] font-semibold text-center"
        >
          Pricing
        </GradientText>
        <p className="text-sm md:text-center text-left  text-muted-foreground font-semibold">
          We are a community-driven platform that empowers users to connect with
          like-minded individuals from around the world. Whether {"you're"} a
          seasoned traveler, a curious explorer, or simply seeking new
          adventures, Europa offers a diverse range of experiences that will
          inspire and enrich your journey.
        </p>
      </BackDropGradient>
      <Card className="p-7 mt-10 md:w-auto w-full bg-themeBlack border-themeGray ">
        <div className="flex flex-col gap-2">
          <CardTitle>199/m</CardTitle>
          <CardDescription className="text-[#B4B0AE]">
            Best value for your needs
          </CardDescription>
          <Link href={"/group/create"}>
            <Button
              variant={"default"}
              className="text-white bg-demonGreen hover:bg-demonGreen/80  flex items-center gap-1 w-full"
            >
              Start for free
              <ArrowRight className=" h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
          <span className="flex gap-2 mt-3 items-center">
            <Check className="text-amber-600" />1 Groups.
          </span>
          <span className="flex gap-2 mt-3 items-center">
            <Check className="text-amber-600" />
            Unlimited Channels.
          </span>
          <span className="flex gap-2 mt-3 items-center">
            <Check className="text-amber-600" />
            Cloud Storage.
          </span>
          <span className="flex gap-2 mt-3 items-center">
            <Check className="text-amber-600" />
            Embed Links.
          </span>
          <span className="flex gap-2 mt-3 items-center">
            <Check className="text-amber-600" />
            Custom Pricing for your groups through Stripe.
          </span>
        </div>
      </Card>
    </div>
  );
};
