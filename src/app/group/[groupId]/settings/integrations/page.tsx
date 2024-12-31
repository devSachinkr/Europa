import { getStripeIntegration } from "@/actions/payment";
import GradientText from "@/components/global/gradient-text";
import IntegrationTrigger from "@/components/global/integration-trigger";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import Image from "next/image";
import StripeLogo from "../../../../../../public/assets/stripe-logo.png";
type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const payment = await getStripeIntegration();
  const connections = {
    stripe: payment.data?.stripeId ? true : false,
  };

  const { groupId } = await params;
  return (
    <div className="flex-1 h-0 grid grid-cols-1 p-5 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
      {EUROPA_CONSTANTS.integrationList.map((integration) => (
        <Card
          key={integration.id}
          className="bg-themeBlack md:w-[30vw] border-demonGreen/60 border-dashed"
        >
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-20">
              <div>
                <div className="w-10 h-10 relative">
                  <Image
                    src={StripeLogo}
                    alt="Integration Logo"
                    width={60}
                    height={60}
                  />
                </div>
                <GradientText element="H2" className="font-bold capitalize">
                  {integration.name}
                </GradientText>
              </div>
              <IntegrationTrigger
                connection={connections}
                title={integration.name}
                description={integration.modalDescription}
                logo={StripeLogo.src}
                name={integration.name}
                groupId={groupId}
              />
            </div>
            <CardDescription>{integration.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default page;
