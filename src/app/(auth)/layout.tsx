import { authUser } from "@/actions/auth";
import BackDropGradient from "@/components/global/back-drop-blur";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
    
     
    const user = await authUser();
    if (user.status === 200) {
           redirect("/callback/sign-in");

    }

    return (
        <div className="container h-screen flex justify-center items-center">
            <div className="flex flex-col w-full items-center py-24">
                <h2 className="text-4xl mb-3 font-bold text-themeTextWhite">
                    Europa.
                </h2>
                <BackDropGradient
                    className="w-4/12 h-2/6 opacity-40"
                    container="flex flex-col items-center"
                >
                        {children}
                </BackDropGradient>
            </div>
        </div>
    );
};

export default layout;
