import { RolesDisplay } from "./(components)/RolesDisplay";
import { getRoles } from "./actions";

export default async function RolesPage() { 
    const roles = await getRoles(); 

    return ( 
        <div>
            <h1 className="text-2xl font-bold mb-4">Roles</h1>
            <RolesDisplay roles = { roles } />
        </div>
    )
}