import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import styles from "./Navbar.module.scss";

export default function Navbar() {
    const session = useSession();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link
                    href={
                        session.status === "authenticated" ? "/dashboard" : "/"
                    }
                    className={styles.logo}
                >
                    saitm
                </Link>
                <ul className={styles.menu}>
                    {session.status === "unauthenticated" && (
                        <li>
                            <a href="/track-application">
                                Track an application
                            </a>
                        </li>
                    )}

                    {session.status === "authenticated" && (
                        <li onClick={() => signOut()}>Sign out</li>
                    )}
                    {session.status === "unauthenticated" && (
                        <li>
                            <Link
                                href={"/apply-now"}
                                className="btn btn-secondary"
                            >
                                Apply now
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
