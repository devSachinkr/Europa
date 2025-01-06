/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SignInFormSchema } from "@/components/forms/auth/sign-in/schema";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import ToastNotify from "@/components/global/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SignUpFormSchema } from "@/components/forms/auth/sign-up/schema";
import { signUpUser } from "@/actions/auth";
import { OAuthStrategy } from "@clerk/types";

const useAuthSignIn = () => {
    const router = useRouter();
    const { isLoaded, setActive, signIn } = useSignIn();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof SignInFormSchema>>({
        mode: "onChange",
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const clerkAuth = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        if (!isLoaded)
            return ToastNotify({
                title: "Oops!",
                msg: "Something went wrong",
            });
        try {
            const authUser = await signIn.create({
                identifier: email,
                password,
            });
            if (authUser.status === "complete") {
                reset();
                await setActive({ session: authUser.createdSessionId });
                ToastNotify({
                    title: "Success",
                    msg: "Login successful",
                });
                router.push("/callback/sign-in");
            }
        } catch (error: any) {
            if (error.errors[0].code === "form_password_incorrect") {
                return ToastNotify({
                    title: "Oops!",
                    msg: "Invalid credentials",
                });
            }
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => clerkAuth({ email, password }),
    });
    const onSubmit = handleSubmit(({ email, password }) => {
        mutate({ email, password });
    });
    return {
        onSubmit,
        isPending,
        register,
        errors,
    };
};

const useAuthSignUp = () => {
    const { setActive, isLoaded, signUp } = useSignUp();
    const [creating, setCreating] = useState<boolean>(false);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        getValues,
    } = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        mode: "onBlur",
    });

    const router = useRouter();

    const generateCode = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        if (!isLoaded)
            if (!isLoaded)
                return ToastNotify({
                    msg: "Something went Wrong",
                    title: "Oops!",
                });
        try {
            if (email && password) {
                await signUp.create({
                    emailAddress: getValues("email"),
                    password: getValues("password"),
                });

                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                });

                setVerifying(true);
            } else {
                return ToastNotify({
                    msg: "Something went Wrong",
                    title: "Oops!",
                });
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
        try {
            if (email && password) {
                await signUp.create({
                    emailAddress: getValues("email"),
                    password: getValues("password"),
                });

                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                });

                setVerifying(true);
            } else {
                return ToastNotify({
                    msg: "Something went Wrong",
                    title: "Oops!",
                });
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
    };

    const initiateUserReg = handleSubmit(async (values) => {
        if (!isLoaded)
            return ToastNotify({
                msg: "Something went Wrong",
                title: "Oops!",
            });

        try {
            setCreating(true);
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code,
                },
            );

            if (completeSignUp.status !== "complete") {
                return ToastNotify({
                    msg: "Something went Wrong",
                    title: "Oops!",
                });
            }

            if (completeSignUp.status === "complete") {
                if (!signUp.createdUserId) return;
                const user = await signUpUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    clerkId: signUp.createdUserId,
                    image: "",
                });

                reset();

                if (user.status === 200) {
                    ToastNotify({
                        msg: user.message,
                        title: "Success",
                    });
                    await setActive({
                        session: completeSignUp.createdSessionId,
                    });
                    router.push(`/group/create`);
                }
                if (user.status !== 201) {
                    ToastNotify({
                        msg: user.message + "action Failed",
                        title: "Oops!",
                    });
                    router.refresh();
                }
                setCreating(false);
                setVerifying(false);
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
    });

    return {
        register,
        errors,
        generateCode,
        initiateUserReg,
        verifying,
        creating,
        code,
        setCode,
        getValues,
    };
};

const useGoogleAuth = () => {
    const { signIn, isLoaded: LoadedSignIn } = useSignIn();
    const { signUp, isLoaded: LoadedSignUp } = useSignUp();

    const signInWith = async (provider: OAuthStrategy) => {
        if (!LoadedSignIn) return;
        try {
            return signIn.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/callback",
                redirectUrlComplete: "/callback/sign-in",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const signUpWith = async (provider: OAuthStrategy) => {
        if (!LoadedSignUp) return;
        try {
            return signUp.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/callback",
                redirectUrlComplete: "/callback/sign-in",
            });
        } catch (error) {
            console.log(error);
        }
    };
    return {
        signInWith,
        signUpWith,
    };
};
export { useAuthSignIn, useAuthSignUp, useGoogleAuth };
