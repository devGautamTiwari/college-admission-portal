"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { Suspense } from "react";

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
                <Suspense fallback={<LoadingComponent />}>
                    <SessionProvider>
                        <Navbar />
                        <main>{children}</main>
                    </SessionProvider>
                </Suspense>
            </body>
        </html>
    );
}
