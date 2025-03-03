import { z } from "zod";

export const driverPost = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  phone: z.string().min(8),
  vehicle_number: z.string().min(5),
  vehicle_type: z.string().min(5),
});

export const packagePost = z.object({
  receiverName: z.string().min(5),
  receiverAddress: z.string().min(5),
  receiverPhone: z.string().min(8),
  receiverLatitude: z.string(),
  receiverLongitude: z.string(),
  senderName: z.string().min(5),
  senderAddress: z.string().min(5),
  senderPhone: z.string().min(8),
  senderLatitude: z.string(),
  senderLongitude: z.string(),
  packageWeight: z.number(),
  packagePrice: z.number(),
  packageDescription: z.string().min(5),
});

export const packagePut = z.object({
  receiverName: z.string().min(5),
  receiverAddress: z.string().min(5),
  receiverPhone: z.string().min(8),
  receiverLatitude: z.string(),
  receiverLongitude: z.string(),
  senderName: z.string().min(5),
  senderAddress: z.string().min(5),
  senderPhone: z.string().min(8),
  senderLatitude: z.string(),
  senderLongitude: z.string(),
  packageWeight: z.number(),
  packagePrice: z.number(),
  packageDescription: z.string().min(5),
});
