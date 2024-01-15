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
