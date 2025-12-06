import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password should be 8 characters long")
})

export type LoginSchema = z.infer<typeof loginSchema>;