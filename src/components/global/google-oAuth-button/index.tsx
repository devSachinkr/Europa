"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Loader } from "../loader";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "@/hooks/auth";
type Props = {
    method: "signin" | "signup";
};

const GoogleAuthButton = ({ method }: Props) => {
    const { signInWith, signUpWith } = useGoogleAuth();
    return (
        <Button
            {...(method === "signin"
                ? {
                      onClick: () => signInWith("oauth_google"),
                  }
                : {
                      onClick: () => signUpWith("oauth_google"),
                  })}
            className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray mt-6 "
            variant={"outline"}
        >
            <Loader loading={false}>
                <FcGoogle />
                Google
            </Loader>
        </Button>
    );
};

export default GoogleAuthButton;
