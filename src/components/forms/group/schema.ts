import { z } from "zod";

export const GroupSchema = z.object({
    category: z.string().min(3, { message: "You must select a category" }),
    name: z
        .string()
        .min(3, { message: "Group name must be at least 3 characters" }),
});
