import { z } from "zod";

export const CourseContentSchema = z.object({
  content: z
    .string()
    .min(100, { message: "Description must be at least 100 characters" }),
  JsonContent: z
    .string()
    .min(100, { message: " Description must be at least 100 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined)),

  htmlContent: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});
