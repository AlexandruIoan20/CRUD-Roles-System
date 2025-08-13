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
    const users = await db.user.findMany(
        {
            select: { 
                id: true, 
                name: true, 
                userRole: true, 
            }
        }
    ); 
    return users; 
}

export const getAllRoles = async () =>  { 
    const roles = await db.role.findMany(); 
    return roles; 
}