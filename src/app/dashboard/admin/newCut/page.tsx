'use client'

import { useRouter } from "next/navigation";
import { LoadingWave } from "@/app/components/general/skeletons";
import { Suspense, useEffect } from "react";
import useUserStore from "../../../../../store/authStore";
import CreateCut from "@/app/components/cutComponents/createCut";

export default function RegisterPage() {
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
                <CreateCut router={router} />
            </Suspense>
        </div>
    );
}
