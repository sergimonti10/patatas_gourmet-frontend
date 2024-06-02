'use client'

import { useRouter } from "next/navigation";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../../store/authStore";
import UpdateUser from "@/app/components/usersComponents/updateUser";
import { Link } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import PageDeleteUser from "@/app/components/usersComponents/deleteUser";

interface UserDetailProps {
    params: {
        id: string;
    };
}

export default function UserUpdatePage({ params }: UserDetailProps) {
    const router = useRouter();

    const { user } = useUserStore();

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        }
    }, [user]);

    return (
        <div className="w-auto h-auto">
            <Suspense fallback={<LoadingWave />}>
                <UpdateUser router={router} params={params} />
                <PageDeleteUser />
            </Suspense>
        </div>
    );
}
