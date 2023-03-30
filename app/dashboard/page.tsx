"use client";

import { signOut } from "next-auth/react";
export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <button type="button" onClick={() => signOut()}>
                Sign out
            </button>
        </div>
    );
}
