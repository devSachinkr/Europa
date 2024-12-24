import { signUpUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const user = await currentUser();
    if (!user) return redirect("/sign-in");
    const complete = await signUpUser({
        clerkId: user.id,
        firstName: user.firstName!,
        lastName: user.lastName!,
        image: user.imageUrl,
    });
    if (complete.status === 201) return redirect("/group/create");
    if (complete.status !== 201) return redirect("/sign-in");
};

export default page;
