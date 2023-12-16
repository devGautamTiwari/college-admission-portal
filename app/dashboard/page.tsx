"use client";

import FacultyDashboard from "@/components/FacultyDashboard/FacultyDashboard";
import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const session: any = useSession();
    if (
        session?.data?.user?.userRole === "faculty" ||
        session?.data?.user?.userRole === "admin"
    ) {
        return <FacultyDashboard />;
    } else if (session?.data?.user?.userRole === "student") {
        return <StudentDashboard />;
    } else {
        return <>Unknown user role</>;
    }
}
