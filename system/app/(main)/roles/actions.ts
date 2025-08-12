"use server"; 

import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { FormState } from "@/lib/utils";
import { roleFormSchema } from "@/schemas/roleFormSchema";

export async function createRole(formData: FormData): Promise<FormState> { 
    const session = await auth();

    if(!session || !session?.user) { 
        return { 
            message: "You must be logged in to create a role.",
            success: false, 
        };
    }

    console.log({ session })

    const addRoleFormData = Object.fromEntries(formData); 
    const verifyFormData = roleFormSchema.safeParse(addRoleFormData); 

    if(!verifyFormData.success) { 
        const issues = verifyFormData.error.issues.map(issue => issue.message); 
        return { 
            message: "Validation failed.",
            issues, 
            success: false 
        };
    }
    
    const rawFormData = verifyFormData.data; 

    console.log({ rawFormData }); 

    const creator = await db.user.findUnique({ 
        where: { 
            email: session.user.email || ""
        }, select: { 
            id: true, 
        }
    }); 

    if(!creator) { 
        return { 
            message: "User with this email was not found.", 
            success: false,
        }
    }

    try { 
        const newRole = await db.role.create({ 
            data: { 
                title: rawFormData.title as string, 
                creatorId: creator.id || "", 
            }
        }); 

        console.log("New role created: ", newRole); 
        return { 
            message: "Role created successfully.",
            success: true, 
        }
    } catch(error) { 
        console.error("Error creating role:", error);
        return { message: "Failed to create role.", success: false };
    }
}
