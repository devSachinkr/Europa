"use client";
import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useAuthSignIn } from "@/hooks/auth";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import React from "react";

const SignInForm = () => {
    const { errors, isPending, onSubmit, register } = useAuthSignIn();
    return (
        <form className="flex flex-col gap-3 mt-10" onSubmit={onSubmit}>
            {EUROPA_CONSTANTS.signInForm.map((field) => (
                <FormGenerator
                    key={field.id}
                    {...field}
                    register={register}
                    errors={errors}
                />
            ))}
            <Button
                type="submit"
                className=" rounded-2xl bg-demonGreen text-white hover:bg-demonGreen/80"
            >
                <Loader loading={isPending}>Sign In</Loader>
            </Button>
        </form>
    );
};

export default SignInForm;
