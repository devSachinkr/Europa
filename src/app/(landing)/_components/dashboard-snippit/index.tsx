import Image from "next/image";
import React from "react";

const DashboardSnippet = () => {
    return (
        <div className="relative py-20">
            <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-40 mx-10" />
            <div className="w-full aspect-video relative">
                <Image
                    priority
                    src="/assets/dashboard-snippet.png"
                    alt="dashboard-snippet"
                    className="opacity-[0.95] "
                    sizes="100vw"
                    fill
                    objectFit="contain"
                />
            </div>
        </div>
    );
};

export default DashboardSnippet;
