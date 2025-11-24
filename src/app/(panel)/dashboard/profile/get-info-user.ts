"use server";

import prisma from "@/lib/prisma";
interface GetInfoUserProps {
    userId: string
}
export async function getInfoUser({userId}: GetInfoUserProps) {
    try{
        const user= await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                subcription: true
            }
        });
        
        if(!user) return null;
        return user;
    } catch(error){
        console.log(error);
        return null;
    }
}