import { z } from "zod";

export const messageSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" }),
  email: z.string().email(),
  message: z
    .string()
    .min(10, { message: "Message must contain at least 10 character(s)" })
    .max(255),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "Title must contain at least 1 character" }),
  description: z
    .string()
    .min(10, { message: "Description must be 10 characters" }),
  github: z.string().url(),
  live: z.string().url(),
  preview: z.array(z.string()),
});
