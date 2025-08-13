import { Input } from "@/components/ui/input";
import { Role } from "@/generated/prisma"; 

interface RoleSelectorProps { 
    roles: Role[], 
    onToggleRole: (roleId: string) => void, 
    selectedRoleIds: string[], 
}

export const RoleSelector = ({ roles, onToggleRole, selectedRoleIds }: RoleSelectorProps) => { 
    return ( 
        <div>
            { roles.map((role) => { 
                return ( 
                    <label key = { role.id } className = "cursor-pointer flex items-center justify-center">
                        <Input 
                            type = "checkbox"
                            checked = { selectedRoleIds.includes(role.id) }
                            onChange = { () => onToggleRole(role.id) }
                        />
                        { role.title }
                    </label>
                )
            })}
        </div>
    )
}