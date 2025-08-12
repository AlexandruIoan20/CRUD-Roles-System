import { Role, User } from "@/generated/prisma";

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
    user: User, 
    roles: Role[], 
}

export const UserCard = ({ user, roles }: UserCardProps) => {
    const [ selectedRoleIds, setSelectedRoleIds] = useState<string[]> ([]); 

    const toggleRole = (roleId: string) => { 
        setSelectedRoleIds(prev => prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]); 
        console.log({ selectedRoleIds }); 
    }

    return ( 
        <div className = "flex items-center justify-between border border-black m-2 p-2">
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
                            user = { user }
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
                        <Button
                            type = "button"
                            onClick = { () => { } }
                        >
                            Select
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}