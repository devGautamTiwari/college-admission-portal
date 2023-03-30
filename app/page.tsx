import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <section className={styles.section__hero}>
                <div className={styles.section__hero__content}>
                    <h1 className={styles.section__hero__heading}>
                        Welcome to
                        <br />
                        St. Andrews Institute
                        <br />
                        of Technology and Management
                    </h1>
                    <div className={styles.section__hero__btngroup}>
                        <button type="button" className="btn btn-primary">
                            Sign in
                        </button>
                        <button type="button" className="btn btn-secondary">
                            Apply now
                        </button>
                    </div>
                </div>
                <p className={styles.section__hero__location}>
                    <Image
                        src={require("/public/static/location.svg").default}
                        alt="@"
                    />
                    Farrukhnagar, Harayana
                </p>

                <a href="#about" className={styles.section__hero__scrolldown}>
                    <Image
                        src={require("/public/static/scroll-down.svg").default}
                        alt="@"
                    />
                </a>
            </section>
            <section id="about" className={styles.section__about}>
                <div className={styles.section__container}>
                    <h2 className={styles.section__heading}>About us</h2>
                    <div className={styles.section__about__content}>
                        <Image
                            src={
                                require("/public/static/about-us-bg.png")
                                    .default
                            }
                            alt="saitm"
                            className={styles.section__about__img}
                        />
                        <div className={styles.section__about__content__text}>
                            <p>
                                St. Andrews Institute of Technology & Management
                                is located in the industrial hub of India
                                Gurgaon, Delhi (NCR). It is spread across 22
                                acres of lush green campus with the globally
                                acknowledged infrastructure. The classrooms are
                                centrally air-conditioned equipped with modern
                                technology for teaching.
                            </p>
                            <p>
                                Good education encompasses instilling moral,
                                aesthetic, athletic, and intellectual values in
                                the citizens of tomorrow. St. Andrews is the
                                best place to achieve this kind of education.
                                Affiliated to MDU and approved by the All India
                                Council for Technical Education (AICTE), our
                                college has lush green surroundings which
                                provides a conducive environment for the
                                students to grow not only as good engineers/
                                managers but as world class citizens too.
                            </p>
                            <p>
                                The teaching and non-teaching staff of the
                                institute is a blend of senior experienced and
                                young, dynamic faculty members devoted to the
                                noble cause of education. We, at St. Andrews
                                look towards creating a workforce that lives and
                                breathes the same spirit. We give importance to
                                practical training, self-learning, coupled with
                                discipline, which attracts students from all
                                over India.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section></section>
            <section></section>
        </main>
    );
}
