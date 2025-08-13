'use server'; 

import { User } from "@/generated/prisma";
import { db } from "@/lib/prisma";

import { FormState } from "@/lib/utils";

export async function selectRolesForUser(user: User, roleIds: string[]): Promise<FormState> {
    try { 
        // Find the user to select the roles
        const selectedUser = await db.user.findUnique({ 
            where: { 
                email: user.email as string, 
            }, 
            include: { 
                userRole: true,
            }
        }); 

        if(!selectedUser) { 
            return { 
                message: "The user was not found.", 
                success: false, 
            }
        }

        // Find the intersected userRoles between prev and next
        let intersectedUserRoleIds: string[] = []; 
        for(let i = 0; i < selectedUser.userRole.length; i++) 
            if(roleIds.includes(selectedUser.userRole[i].roleId)) intersectedUserRoleIds.push(selectedUser.userRole[i].roleId); 

        // Find the roles that are in the previousRoles but are not in the intersection and delete them 
        for(let i = 0; i < selectedUser.userRole.length; i++) 
            if(intersectedUserRoleIds.includes(selectedUser.userRole[i].roleId) === false)
                await db.userRole.delete({ 
                    where: { 
                        id: selectedUser.userRole[i].id, 
                    }
                }); 

        // Find the roles that are not in the intersection but are in the next state
        for(let i = 0; i < roleIds.length; i++) 
            if(intersectedUserRoleIds.includes(roleIds[i]) === false) 
                await db.userRole.create({ 
                    data: { 
                        userId: selectedUser.id, 
                        roleId: roleIds[i]
                    }
                }); 
            

        return { 
            message: "The roles were selected successfully", 
            success: true, 
        }
    } catch(error) { 
        console.log(error); 
        return { 
            message: "An error occured when selecting the role.", 
            success: false, 
        }
    }
}