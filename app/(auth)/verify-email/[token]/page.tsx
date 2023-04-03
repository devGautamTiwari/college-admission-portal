"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import styles from "../verify-email.module.scss";

interface Props {
    params: {
        token: string;
    };
}

export default function EmailConfirm({ params }: Props) {
    const { token } = params;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState({
        error: false,
        message: "Getting status. Please wait...",
    });
    const [seconds, setSeconds] = useState(5);
    const sendToken = useCallback(
        async (token: string) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const { data } = await axios.put(
                    `/api/email/${token}`,
                    {},
                    config
                );
                console.log(data.message);
                setResponse({ error: false, message: data.message });
            } catch (error: any) {
                console.log(error?.response?.data || error?.message);
                setResponse({
                    error: true,
                    message: error?.response?.data?.message || error?.message,
                });
            } finally {
                setLoading(false);
                setTimeout(() => router.replace("/dashboard"), 5000);
            }
        },
        [router]
    );

    useEffect(() => {
        sendToken(token);
    }, [sendToken, token]);
    return (
        <div className={styles.container}>
            {loading ? (
                <Image
                    src={require("/public/static/images/hourglass.svg").default}
                    alt={"loading"}
                    width={96}
                    height={96}
                    className={`${styles.message__icon} ${styles["message__icon--loading"]}`}
                />
            ) : (
                <Image
                    src={
                        response.error
                            ? require("/public/static/images/close--outline.svg")
                                  .default
                            : require("/public/static/images/checkmark--outline.svg")
                                  .default
                    }
                    alt={response.error ? "error" : "success"}
                    width={96}
                    height={96}
                    className={styles.message__icon}
                />
            )}

            <p className={styles.message}>{response.message}</p>
            <span>
                Redirecting to sign in page in {seconds} seconds or you can{" "}
                <Link href={"/dashboard"} className={styles.link}>
                    click here
                </Link>
            </span>
        </div>
    );
}
