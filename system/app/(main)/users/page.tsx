import { UsersDisplay } from "./(components)/UsersDisplay"; 
import { getAllUsers } from "@/app/actions";

export default async function UsersPage () { 
    const users = await getAllUsers(); 

    return ( 
        <div>
            <UsersDisplay users = { users } /> 
        </div>
    )
}