import BackDropGradient from "@/components/global/back-drop-blur";
import GlassCard from "@/components/global/glass-card";
import GradientText from "@/components/global/gradient-text";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import React from "react";

type Props = Promise<{
    children: React.ReactNode;
}>;

const layout = async (props: Props) => {
    const { children } = await props;
    return (
        <div className="container h-screen grid grid-cols-1 lg:grid-cols-2 content-center">
            <div className="flex items-center">
                <BackDropGradient className="w-8/12 h-2/6 opacity-90">
                    <h5 className="text-2xl font-bold text-themeTextWhite">
                        Europa.
                    </h5>
                    <GradientText
                        element="H2"
                        className="text-4xl font-semibold py-1"
                    >
                        Create Group
                    </GradientText>
                    <p className="text-themeTextGray">
                        Free for 14 days, then ₹199/m. Cancel anytime. All
                        features available. Unlimited access to all features. No
                        hidden fees.
                    </p>
                    <div className="flex flex-col gap-3 mt-16 pl-5 ">
                        {EUROPA_CONSTANTS.groupPlaceholder.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center  gap-3"
                            >
                                <item.icon />
                                <p className="text-themeTextGray">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </BackDropGradient>
            </div>
            <div>
                <BackDropGradient
                    className="w-6/12 h-3/6 opacity-90 "
                    container="lg:items-center"
                >
                    <GlassCard className="xs:w-full lg:w-10/12 xl:8/12 mt-16 py-7">
                        {children}
                    </GlassCard>
                </BackDropGradient>
            </div>
        </div>
    );
};

export default layout;
