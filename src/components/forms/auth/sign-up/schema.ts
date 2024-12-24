import { z } from "zod";

export const SignUpFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(32, { message: "First name must be at most 32 characters" }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(32, { message: "Last name must be at most 32 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(32, {
            message: "Password must be at most 32 characters",
        }),
});
