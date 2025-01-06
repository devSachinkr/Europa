import GradientText from "@/components/global/gradient-text";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";


const CTA = () => {
  return (
    <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
      <GradientText
        element="H1"
        className="text-[35px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
      >
        Uniting Hearts
        <br className="md:hidden" /> and Minds
      </GradientText>

      <p className="text-sm md:text-center text-left  text-muted-foreground font-semibold">
        We are a community-driven platform that empowers users to connect with
        like-minded individuals from around the world. Whether {"you're"} <br />
        a seasoned traveler, a curious explorer, or simply seeking new
        adventures, Europa offers a diverse range of experiences that will
        inspire and enrich your journey.
      </p>
      <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
        <Link href="/explore"
          className="rounded-xl bg-transparent text-base hover:bg-demonGreen hover:text-themeTextWhite border-demonGreen border-2 p-2 text-center font-semibold"
        >
          Explore Groups
        </Link>
        <Link href="/sign-in">
          <Button className="text-white bg-demonGreen hover:bg-demonGreen/80  flex items-center gap-1 w-full">
            Get Started
            <ArrowRight className=" h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTA;
