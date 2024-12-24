import React from "react";
import CTA from "./_components/call-to-action";
import DashboardSnippet from "./_components/dashboard-snippit";
import dynamic from "next/dynamic";
const Subscriptions = dynamic(
    () =>
        import("./_components/subscription").then(
            (compo) => compo.Subscription,
        ),
    { ssr: true },
);
const page = () => {
    return (
        <main className="md:px-10 py-20 flex flex-col gap-36">
            <div>
                <CTA />
                <DashboardSnippet />
            </div>
            <Subscriptions />
        </main>
    );
};

export default page;
