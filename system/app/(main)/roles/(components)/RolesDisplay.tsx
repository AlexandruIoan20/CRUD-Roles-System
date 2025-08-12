"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Role } from "@/generated/prisma";
import { GoTrash } from "react-icons/go"; 

import { deleteRoleById } from "../actions";

import { useAlert } from "@/hooks/useAlert";
import { useState } from "react";
import { AlertText } from "@/components/AlertText";

interface RolesDisplayProps { 
    roles: Role[], 
}

export const RolesDisplay = ({ roles }: RolesDisplayProps) => { 
    const router = useRouter(); 

    const [ loading, setLoading ] = useState<boolean> (false); 
    const { alertTitle, alertDescription, errorState, isSubmited, setIsSubmited, setAlert } = useAlert(); 

    const handleDeleteRoleById = async (roleId: string) => { 
        setLoading(true); 
        setIsSubmited(true); 
        try { 
            const response = await deleteRoleById(roleId); 

            if(response.success) { 
                setAlert("Success!", response.message, false); 
            } else { 
                setAlert("Error!", response.message, true); 
            }
        } catch(error) { 
            console.log(error); 
        } finally { 
            setLoading(false); 
        }
    }
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
                                    <div key = { role.id } className = "flex items-center justify-between mx-4 my-2">
                                        { role.title }
                                        <Button disabled = { loading } onClick = { async() => { await handleDeleteRoleById(role.id)}}>
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

            { isSubmited && 
                <AlertText alertTitle = { alertTitle } alertDescription = { alertDescription } errorState = { errorState } />
            }
        </div>
    )
}