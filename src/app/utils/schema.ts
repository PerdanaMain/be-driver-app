import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string(),
});
