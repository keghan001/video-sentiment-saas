import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password should be 8 characters long")
})

export const singnupSchema = z.object({
    name: z.string().min(3, "Name must be more than 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SingnupSchema = z.infer<typeof singnupSchema>