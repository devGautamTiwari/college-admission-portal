"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <SessionProvider>
                    <Navbar />
                    <main>{children}</main>
                </SessionProvider>
            </body>
        </html>
    );
}
