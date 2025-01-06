import { authUser } from "@/actions/auth";
import { getAffiliateInfo } from "@/actions/group";
import GroupForm from "@/components/forms/group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Promise<{ [affiliate: string]: string }>;
};

const page = async ({ searchParams }: Props) => {
  const { affiliate } = await searchParams;
  const user = await authUser();
  const affiliateInfo = await getAffiliateInfo({ affiliate });
  if (!user || !user.id) return redirect("/sign-in");

  return (
    <>
      <div className="px-7 flex flex-col">
        <h5 className="font-bold text-base text-themeTextWhite">
          Payment Method
        </h5>
        <p className="text-themeTextGray leading-tight">
          We are a community-driven platform that empowers users to connect with
          like-minded individuals from around the world. Whether {"you're"} a
          seasoned traveler, a curious explorer, or simply seeking new
          adventures, Europa offers a diverse range of experiences that will
          inspire and enrich your journey.
        </p>
        {affiliateInfo.status === 200 && (
          <div className="w-full mt-5 flex justify-center items-center gap-x-2 italic text-themeTextGray text-sm">
            You were referred by{" "}
            <Avatar>
              <AvatarImage
                src={affiliateInfo.data?.Group?.User?.image as string}
                alt="User"
              />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            {affiliateInfo.data?.Group?.User.firstName}{" "}
            {affiliateInfo.data?.Group?.User.lastName}
          </div>
        )}
      </div>
      <GroupForm
        userID={user.id}
        affiliate={affiliateInfo.status === 200}
        stripeId={affiliateInfo.data?.Group?.User.stripeId || ""}
      />
    </>
  );
};

export default page;
