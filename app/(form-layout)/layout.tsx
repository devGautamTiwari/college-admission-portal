"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./layout.module.scss";

const defaultCallbackUrl = "/dashboard";
export default function Layout({ children }: { children: React.ReactNode }) {
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl =
        (searchParams?.get("callbackUrl") as string) || defaultCallbackUrl;
    useEffect(() => {
        if (session.status === "loading") {
        } else if (session.status === "authenticated") {
            router.replace(callbackUrl);
        }
    }, [callbackUrl, router, session.status]);
    return (
        <>
            <section className={styles.section}>
                <div className={styles.side}>
                    <h2 className={styles.heading}>SAITM</h2>
                    <p className={styles.para}>
                        Approved by AICTE, Govt. of India, New Delhi. Affiliated
                        to Maharshi Dayanand University. &apos;A&apos; Grade
                        state university, accredited by NAAC.
                    </p>
                </div>

                <div className={styles.container}>
                    <div className={styles.formcontainer}>{children}</div>
                </div>
            </section>
        </>
    );
}
