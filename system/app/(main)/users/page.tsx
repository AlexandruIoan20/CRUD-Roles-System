import { UsersDisplay } from "./(components)/UsersDisplay"; 
import { getAllUsers, getAllRoles } from "@/app/actions";

export default async function UsersPage () { 
    const users = await getAllUsers(); 
    const roles = await getAllRoles(); 

    return ( 
        <div>
            <UsersDisplay users = { users } roles = { roles } /> 
        </div>
    )
}