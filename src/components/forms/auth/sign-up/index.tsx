"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useAuthSignUp } from "@/hooks/auth";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import dynamic from "next/dynamic";
import React from "react";
const OtpInput = dynamic(() =>
    import("./otp-input").then((mod) => mod.OtpInput),
);
const SignUpForm = () => {
    const {
        initiateUserReg,
        creating,
        verifying,
        register,
        errors,
        code,
        setCode,
        generateCode,
        getValues,
    } = useAuthSignUp();
    return (
        <form onSubmit={initiateUserReg} className="flex flex-col gap-3 mt-10">
            {verifying ? (
                <div className="flex justify-center mb-5">
                    <OtpInput otp={code} setOtp={setCode} />
                </div>
            ) : (
                EUROPA_CONSTANTS.signUpForm.map((field) => (
                    <FormGenerator
                        {...field}
                        key={field.id}
                        register={register}
                        errors={errors}
                    />
                ))
            )}

            {verifying ? (
                <Button type="submit" className="rounded-2xl">
                    <Loader loading={creating}>Sign Up with Email</Loader>
                </Button>
            ) : (
                <Button
                    id="clerk-captcha"
                    type="button"
                    className="rounded-2xl"
                    onClick={() =>
                        generateCode({
                            email: getValues("email"),
                            password: getValues("password"),
                        })
                    }
                >
                    <Loader loading={false}>Generate Code</Loader>
                </Button>
            )}
        </form>
    );
};

export default SignUpForm;
