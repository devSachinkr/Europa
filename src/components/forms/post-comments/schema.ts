import { z } from "zod";

export const PostCommentsSchema = z.object({
  comment: z.string().min(1, { message: "Comment is Required" }),
});
