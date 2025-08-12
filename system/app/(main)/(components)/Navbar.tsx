import { LogoutButton } from "./LogoutButton"; 
import Link from "next/link";

export const Navbar = () => { 
    return ( 
        <nav className = "flex justify-between items-center p-4 bg-gray-800 text-white">
            CRUD Roles System
            <Link href = "/roles"> Roles </Link>
            <LogoutButton />
        </nav>
    )
}