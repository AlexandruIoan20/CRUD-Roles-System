"use client"; 

import { User } from "@/generated/prisma"; 

import { UserCard } from "./UserCard";

interface UsersDisplayProps { 
    users: User[]
}

export const UsersDisplay = ({ users }: UsersDisplayProps) => { 
    return ( 
        <div> 
            { users.length === 0 ? 
                ( 
                    <div> No user found. </div>
                ) : 
                ( 
                    <div className = "border border-black m-2">
                        { users.map((user) => { 
                            return ( 
                                <UserCard key = { user.id } user = { user } />
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}