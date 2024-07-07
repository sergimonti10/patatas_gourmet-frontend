'use client'

import { useRouter } from "next/navigation";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../../../../store/authStore";
import UpdateUser from "@/app/components/usersComponents/updateUser";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface UserDetailProps {
    params: {
        id: string;
    };
}

export default function UserUpdatePage({ params }: UserDetailProps) {
    const router = useRouter();

    const { user, roles } = useUserStore();

    useEffect(() => {
        if (!user || !roles.includes('super-admin')) {
            window.location.href = '/';
        }
    }, [user, roles]);


    return (
        <div className="w-auto h-auto">
            <Suspense fallback={<LoadingWave />}>
                <header className="flex items-center py-4 w-full z-20">
                    <div className="flex items-center justify-start">
                        <Link href="/dashboard/admin/users" className="flex items-center justify-center z-20 mx-4">
                            <FaArrowLeft className="w-8 h-8 text-amber-950 transition-all active:scale-95 hover:filter hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                        </Link>
                    </div>
                </header>
                <UpdateUser router={router} params={params} />
            </Suspense>
        </div>
    );
}
