"use client"; 

import { User, Role } from "@/generated/prisma"; 

import { UserCard } from "./UserCard";


interface UsersDisplayProps { 
    users: User[], 
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