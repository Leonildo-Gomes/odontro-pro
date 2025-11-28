"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
//import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, {message: "name must be at least 2 characters"}),
    price: z.number().min(1, {message: "price must be at least 1"}),
    duration : z.number(),
});

type FormSchema = z.infer<typeof formSchema>;
export async function createNewService(formData: FormSchema) {
    const session = await auth();
    if(!session?.user?.id){
        return { error: "User not authenticated"};
    }
    const schema= formSchema.safeParse(formData);
    if(!schema.success){
        return{error: schema.error.issues[0].message };
    }

    try {
        await prisma.service.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                userId: session.user.id
            }
        });
        //revalidatePath('/dashboard/services');
        return { data: "Service created successfully" };
    } catch (error) {
        return { error: "Error creating service"};
    }
        
}