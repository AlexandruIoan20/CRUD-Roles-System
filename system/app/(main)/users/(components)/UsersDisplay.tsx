"use client"; 

import { Role, UserRole } from "@/generated/prisma"; 

import { UserCard } from "./UserCard";

// Shadcn Components
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"; 


export interface SelectedUserInterface { 
    id: string, 
    name: string, 
    userRole: UserRole[], 
}

interface UsersDisplayProps { 
    users: SelectedUserInterface[], 
    roles: Role[], 
}

export const UsersDisplay = ({ users, roles }: UsersDisplayProps) => { 
    return ( 
        <div className="w-full overflow-auto">
        <Command className="w-full h-full">
            <CommandInput placeholder="Search a user..." />
            <CommandList className="w-full max-h-none h-auto overflow-visible">
            <CommandEmpty>No user found.</CommandEmpty>
            {users.map((user) => (
                <CommandItem key={user.id}>
                    <UserCard user={user} roles={roles} />
                </CommandItem>
            ))}
            </CommandList>
        </Command>
        </div>
    )
}