"use client"

import Login from "@/app/ui/loginComponents/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    return (
        <Login router={router} />
    );
}