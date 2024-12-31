import { getAffiliate } from "@/actions/group";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";
import CopyButton from "./_components/copy-button";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

const page = async (props: Props) => {
  const { groupId } = await props.params;
  const affiliate = await getAffiliate({ groupId });
  return (
    <div className="flex flex-col items-start p-5">
      <Card className="border-demonGreen/60 bg-[#1A1A1D] text-white font-semibold p-5 border-dashed ">
        <CardTitle className="text-gradient text-2xl">Affiliate Link</CardTitle>
        <CardDescription>
          Create and share an invitations link to your affiliate
        </CardDescription>
        <div className="mt-8 flex flex-col gap-y-2">
          <div className="bg-black border-themeGray p-3 rounded-lg flex gap-x-5 items-center">
            {process.env.NEXT_PUBLIC_APP_URL}/affiliates/{affiliate.data?.id}
          </div>
          <CopyButton
            content={`${process.env.NEXT_PUBLIC_APP_URL}/affiliates/${affiliate.data?.id}`}
          />
        </div>
        <CardDescription className="text-themeTextGray">
          This link will redirect users to the main page where <br />
          they can purchase or request memberships
        </CardDescription>
      </Card>
    </div>
  );
};
 export default page;
