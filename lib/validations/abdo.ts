import * as z from "zod";

export const AbdoValidation = z.object({
  abdo: z
    .string()
    .nonempty()
    .min(3, { message: "Must be at least 3 characters" })
    .max(2000, { message: "Limit reached" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  abdo: z
    .string()
    .nonempty()
    .min(3, { message: "Must be at least 3 characters" })
    .max(1000, { message: "Limit reached" }),
});
