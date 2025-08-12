"use client"; 

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Role } from "@/generated/prisma";
import { GoTrash } from "react-icons/go"; 

interface RolesDisplayProps { 
    roles: Role[], 
}

export const RolesDisplay = ({ roles }: RolesDisplayProps) => { 
    const router = useRouter(); 
    return ( 
        <div>  
            <div>
                { roles.length === 0 ? 
                    ( 
                        <div> No roles! </div>
                    ) : ( 
                        <div className = "border-2 border-black m-2">
                            { roles.map((role) => { 
                                return ( 
                                    <div className = "flex items-center justify-between mx-4 my-2">
                                        { role.title }
                                        <Button>
                                            <GoTrash /> 
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            </div>
            <Button onClick = { () => { router.push("/roles/add")}}> Add Role </Button>
        </div>
    )
}