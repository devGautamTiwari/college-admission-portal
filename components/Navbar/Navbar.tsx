import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo}>saitm</div>
                <ul className={styles.menu}>
                    <li>
                        <a href="/track-application">Track your Application</a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-primary">
                            Apply now
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
