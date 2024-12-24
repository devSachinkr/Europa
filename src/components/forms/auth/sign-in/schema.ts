import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(32, {
            message: "Password must be at most 32 characters",
        })
        .refine((val) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,32}$/.test(val), {
            message: "Password must contain at least one letter and one number",
        }),
});
