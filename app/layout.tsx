import "./globals.scss";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
    title: "College Admission Portal",
    description: "College Admission Portal",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}
