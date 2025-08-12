"use client"; 

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RolesPage() { 
    const router = useRouter(); 
    return ( 
        <div>
            <Button onClick = { () => { router.push("/roles/add")}}> Add Role </Button>
        </div>
    )
}