"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading") return <></>;
    else if (session.status === "unauthenticated") {
        router.push("/signin");
    } else {
        return <>{children}</>;
    }
}
