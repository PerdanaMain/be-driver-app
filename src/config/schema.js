import { z } from "zod";

export const driverPost = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  phone: z.string().min(8),
  vehicle_number: z.string().min(5),
  vehicle_type: z.string().min(5),
});
