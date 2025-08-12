"use server"; 

import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { FormState } from "@/lib/utils";
import { roleFormSchema } from "@/schemas/roleFormSchema";

import { getUserByEmail } from "@/app/actions";
import { revalidatePath } from "next/cache";

const simplifyString = (string: string) => {
  string = string.toLocaleLowerCase();

  string = string.replace(/\s+/g, ''); // fara spatii

  const diacriticsMap: Record<string, string> = {
    ă: 'a',
    â: 'a',
    î: 'i',
    ș: 's',
    ţ: 't',
    ț: 't',
  };

  string = string.replace(/[ăâîșșțț]/g, (match) => diacriticsMap[match] || match);
  string = string.replace(/(.)\1+/g, '$1');

  return string;
}

const validateRoleTitle = async (title: string) => { 
    const simpleRoleTitle = simplifyString(title); 

    let roles = await db.role.findMany();
    
    for(let i = 0; i < roles.length; i++) roles[i].title = simplifyString(roles[i].title);
    for(let i = 0; i < roles.length; i++) if(roles[i].title == simpleRoleTitle) return false; 

    return true; 
}

export async function createRole(formData: FormData): Promise<FormState> { 
    // Verify that the user is authenticated
    const session = await auth();

    if(!session || !session?.user) { 
        return { 
            message: "You must be logged in to create a role.",
            success: false, 
        };
    }

    console.log({ session })

    // Validate the form data
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

    // Find the creator by email in the database
    const creator = await getUserByEmail(session.user.email as string);
    console.log("Creator: ", creator);

    if(!creator) { 
        return { 
            message: "User with this email was not found.", 
            success: false,
        }
    }

    // Look for already existing roles
    const isRoleTitleValid = await validateRoleTitle(rawFormData.title); 
    if(!isRoleTitleValid) {
        return { 
            message: "Role with this title already exists.", 
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

export const getRoles = async () => { 
    const roles = await db.role.findMany(); 

    return roles; 
}

export async function deleteRoleById (roleId: string): Promise<FormState> { 
    try { 
        await db.role.delete({ 
            where: { 
                id: roleId
            }
        }); 

        revalidatePath("/roles"); 
        return { 
            message: "Role deleted successfully", 
            success: true, 
        }
    } catch(error) { 
        console.log(error); 
        return { 
            message: "An error occured during the action.", 
            success: false, 
        }

    }
}