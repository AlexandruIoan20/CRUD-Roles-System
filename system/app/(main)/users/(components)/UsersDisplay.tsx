"use client"; 

import { Role, UserRole } from "@/generated/prisma"; 

import { UserCard } from "./UserCard";

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
        <div> 
            { users.length === 0 ? 
                ( 
                    <div> No user found. </div>
                ) : 
                ( 
                    <div className = "m-2">
                        { users.map((user) => { 
                            return ( 
                                <UserCard key = { user.id } user = { user } roles = { roles } />
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}