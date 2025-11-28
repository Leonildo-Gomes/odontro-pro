
"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
    serviceId: z.string().min(1, {message: "service Id is required"}),
    name: z.string().min(2, {message: "name must be at least 2 characters"}),
    price: z.number().min(1, {message: "price must be at least 1"}),
    duration : z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateServiceById(formData: FormSchema ) {
    const session = await auth();
    if(!session?.user?.id){
        return { error: "User not authenticated"};
    }
    const schema= formSchema.safeParse({
        serviceId: formData.serviceId,
        name: formData.name, 
        price: formData.price, 
        duration: formData.duration
    });
    if(!schema.success){
        return{error: schema.error.issues[0].message };
    }

    try {
        await prisma.service.update({
            where: {
                id: formData.serviceId,
                userId: session.user.id
            },
            data: {
                name: formData.name,
                price: formData.price,
                duration:   formData.duration,
            }
        });
        revalidatePath('/dashboard/services');
        return { data: "Service updated successfully" };
    } catch (error) {
        return { error: "Error updating service"};
    }
        
}