"use server";


import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
   serviceId: z.string().min(1, {message: "service Id is required"}),
});

type FormSchema = z.infer<typeof formSchema>;
export async function deleteService( formatData : FormSchema) {
    const session = await auth();
    if(!session?.user?.id){
        return { error: "User not authenticated"};
    }
    const schema= formSchema.safeParse(formatData);
    if(!schema.success){
        return{error: schema.error.issues[0].message };
    }

    try {
        await prisma.service.update({
            data: {
                status: false
            },
            where: {
                id: formatData.serviceId,
                userId: session.user.id
            }
        });
        revalidatePath('/dashboard/services');
        return { data: "Service deleted successfully" };
    } catch (error) {
        return { error: "Error deleting service"};
    }
        
}