import { User } from "@/generated/prisma";

interface UserCardProps { 
    user: User
}

export const UserCard = ({ user }: UserCardProps) => {
    return ( 
        <div>
            { user.name }
        </div>
    )
}