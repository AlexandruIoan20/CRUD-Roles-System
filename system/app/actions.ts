import { db } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => { 
    const user = await db.user.findUnique({ 
        where: { 
            email 
        }
    }); 

    return user; 
}

export const getAllUsers = async () => { 
    const users = await db.user.findMany(); 
    return users; 
}