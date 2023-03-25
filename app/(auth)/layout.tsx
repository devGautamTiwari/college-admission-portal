import styles from "./auth.module.scss";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.side}>
                    <h2 className={styles.heading}>SAITM</h2>
                    <p className={styles.para}>
                        Approved by AICTE, Govt. of India, New Delhi.Affiliated
                        to Maharshi Dayanand University. &apos;A&apos; Grade
                        state university, accredited by NAAC.
                    </p>
                </div>

                <div className={styles.container}>{children}</div>
            </section>
        </>
    );
}
