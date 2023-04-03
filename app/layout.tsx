"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.scss";
import Navbar from "@/components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loading from "./loading";

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
                {/* <Loading /> */}
            </body>
        </html>
    );
}
