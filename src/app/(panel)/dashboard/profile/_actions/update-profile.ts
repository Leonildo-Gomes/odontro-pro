"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({ 
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status:z.boolean(),
    timezone: z.string(),
    times: z.array(z.string()).optional(),
    
});

type FormSchema = z.infer<typeof formSchema>;
export async function updateProfileAction(formData: FormSchema) {
    const session = await auth();
    if(!session?.user?.id){
        return { error: "User not authenticated"};
    }
    const schema= formSchema.parse(formData);
    if(!schema){
        return{error: "Invalid form data" };
    }
   
    
   try {
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                status: formData.status,
                timezone: formData.timezone,
                times: formData.times
            }
     });
     revalidatePath('/dashboard/profile');
     return { data: "Profile updated successfully" };

   } catch (error) {
       return { error: "Error updating profile"};
   }


}