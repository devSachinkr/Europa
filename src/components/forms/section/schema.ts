import { z } from "zod";

export const SectionSchema = z.object({
  name: z.string().min(1, { message: "Section name is required" }),
});
