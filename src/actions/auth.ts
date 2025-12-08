"use server";

import { hash } from "bcryptjs";
import { singnupSchema, type SingnupSchema } from "~/schemas/auth";
import { db } from "~/server/db";

export async function registerUser(data: SingnupSchema) {
    try {
        //Server-side validation
        const result = singnupSchema.safeParse(data);
        if(!result.success){
            return {error: "Invalid data"};
        }
        
        const {name, email, password} = data;

        //Check if user exist
        const existingUser = await db.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            return {error: "Account already registered"}
        }

        const hashedPassword = await hash(password, 12);

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        
        return {success: true}
    } catch (error) {
        return {error: "Something went wrong"}
    }
}