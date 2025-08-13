import { Role, UserRole } from "@/generated/prisma";
import { SelectedUserInterface } from "./UsersDisplay";
import { selectRolesForUser } from "../actions";

import { RoleSelector } from "./RoleSelector";
import { useState } from "react";

// Shadcn Components
import {
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter, 
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserCardProps { 
    user: SelectedUserInterface, 
    roles: Role[], 
}

export const UserCard = ({ user, roles }: UserCardProps) => {
    const [ selectedRoleIds, setSelectedRoleIds ] = useState<string[]> (user.userRole.map(ur => ur.roleId) || []); 

    const toggleRole = (roleId: string) => { 
        setSelectedRoleIds(prev => prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]); 
    }

    const handleSelectRoles = async () => { 
        try { 
            await selectRolesForUser(user.id, selectedRoleIds || []); 
        } catch(error) { 
            console.log(error); 
        }
    }

    return ( 
        <div className = "flex items-center justify-between m-2 p-2">
            { user.name }
            <Dialog>
                <DialogTrigger asChild>
                    <Button> Set Role </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> Set roles to the user </DialogTitle>
                        <DialogDescription> Select the roles that you want this user to have. </DialogDescription>
                        <RoleSelector
                            onToggleRole = { toggleRole }
                            roles = { roles }
                            selectedRoleIds = { selectedRoleIds }
                        />
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type = "button"
                                variant = "secondary"
                            >
                                Close
                            </Button>
                        </DialogClose>

                        <DialogClose asChild>
                            <Button
                                type = "submit"
                                onClick = { async () => { await handleSelectRoles() } }
                            >
                                Select
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}