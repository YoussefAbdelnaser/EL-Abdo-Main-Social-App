import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Must be bigger than 3 characters" })
    .max(24, { message: "Must be less than 24 characters" }),
  username: z
    .string()
    .min(3, { message: "Must be bigger than 3 characters" })
    .max(24, { message: "Must be less than 24 characters" }),
  bio: z
    .string()
    .min(3, { message: "Must be bigger than 3 characters" })
    .max(900, { message: "Must be less than 900 characters" }),
});
