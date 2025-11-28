"use server"

import prisma from '@/lib/prisma';

export async function getAllServices({userId}: {userId: string}) {
    // Simulate fetching services for a specific user

    if(!userId){
       return {error:"User ID is required to fetch services."}
    }
    try {
        const services = await prisma.service.findMany({
            where: {
                userId: userId,
                status: true,
            }
        });
        return {data: services};
        
    } catch (err) {
        return { error: "Failed to fetch services." };
    }
}