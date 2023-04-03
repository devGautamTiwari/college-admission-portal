import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

// import { useRouter } from "next/navigation";
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
                    <li>
                        <a href="/track-application">Track your Application</a>
                    </li>
                    {session.status === "authenticated" && (
                        <li
                            onClick={() => signOut()}
                            style={{ cursor: "pointer" }}
                        >
                            Sign out
                        </li>
                    )}
                    {session.status === "unauthenticated" && (
                        <li>
                            <Link
                                href={"/apply-now"}
                                className="btn btn-primary"
                                style={{ color: "var(--light-color)" }}
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
