import { z } from "zod";

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const CourseSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  image: z
    .any({ required_error: "Image is required" })
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Image size must be less than 2MB",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Image type must be one of the following: jpeg, png, jpg",
    }),
  privacy: z
    .string()
    .min(1, { message: "Choose a privacy setting for your course" }),
  published: z.boolean(),
});
