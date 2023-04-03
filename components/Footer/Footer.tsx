import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__content}>
                <div className={styles.footer__branding}>
                    <Image
                        src={
                            require("/public/static/images/saitm-logo.png")
                                .default
                        }
                        alt="saitm"
                        className={styles.footer__branding__logo}
                    />
                    <h2 className={styles.footer__branding__text}>
                        St. Andrews Institute
                    </h2>
                </div>
                <div className={styles.footer__office}>
                    <h3 className={styles.footer__office__heading}>
                        Corporate Office
                    </h3>
                    <ul className={styles.footer__office__links}>
                        <li>
                            <Link href={"/"}>
                                <Image
                                    src={
                                        require("/public/static/images/location.svg")
                                            .default
                                    }
                                    alt=""
                                />
                                St. Andrews, 9th Avenue, IP extention,
                                Patparganj, Delhi-110092
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <Image
                                    src={
                                        require("/public/static/images/telephone.svg")
                                            .default
                                    }
                                    alt=""
                                />
                                (+91) 8505937772
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                <Image
                                    src={
                                        require("/public/static/images/email.svg")
                                            .default
                                    }
                                    alt=""
                                />
                                standrews@saitm.org
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer__website}>
                    <h3 className={styles.footer__website__heading}>Website</h3>
                    <ul className={styles.footer__website__links}>
                        <li>
                            <Link href={"/"}>About us</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Courses</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Contact us</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Track your application</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p className={styles.footer__copyright}>
                Copyright &copy; 2023. All copyright reserved.{" "}
            </p>
        </footer>
    );
}
