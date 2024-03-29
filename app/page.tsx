"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";
import CountUp from "react-countup";
const Form = dynamic(() => import("@/components/Form/Form"));

export default function Home() {
    const session = useSession();
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const aboutRef = useRef<HTMLDivElement>(null);
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/contact", form);
            console.log(data);
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            const error = err as AxiosError;
            console.log(error?.response?.data || error?.message);
        }
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((currentForm) => ({
            ...currentForm,
            [e.target.name]: e.target.value,
        }));
    };
    const formConfig = {
        branded: false,
        title: "Contact Us",
        subtitle: "Have a query? Send us a message.",
        formProps: {
            autoComplete: "off",
            onSubmit: submitHandler,
        },
        formInputs: [
            {
                label: "Name",
                inputProps: {
                    id: "name",
                    type: "text",
                    name: "name",
                    placeholder: "Name...",
                    required: true,
                    value: form.name,
                    onChange: changeHandler,
                },
            },
            {
                label: "Email",
                inputProps: {
                    id: "email",
                    type: "email",
                    name: "email",
                    placeholder: "Email address...",
                    required: true,
                    value: form.email,
                    onChange: changeHandler,
                },
            },
            {
                label: "Subject",
                inputProps: {
                    id: "subject",
                    type: "text",
                    name: "subject",
                    placeholder: "Subject...",
                    required: true,
                    value: form.subject,
                    onChange: changeHandler,
                },
            },
            {
                label: "Message/Query",
                inputProps: {
                    id: "message",
                    name: "message",
                    placeholder: "Message/Query...",
                    required: true,
                    multiline: true,
                    value: form.message,
                    onChange: changeHandler,
                },
            },
        ],
        submitBtn: {
            text: "Send",
            btnProps: { className: "btn btn-primary" },
        },
        // links: [
        //     {
        //         text: "Sign in",
        //         href: "/signin",
        //     },
        // ],
    };
    const courses = [
        {
            name: "D. Pharma",
            duration: "2",
            fee: "70,000",
        },
        {
            name: "B. Pharma",
            duration: "3",
            fee: "80,000",
        },
        {
            name: "B. Tech",
            duration: "4",
            fee: "92,000",
        },
        {
            name: "BBA",
            duration: "3",
            fee: "92,000",
        },
        {
            name: "BCA",
            duration: "3",
            fee: "80,000",
        },
        {
            name: "MBA",
            duration: "2",
            fee: "100,000",
        },
        {
            name: "M. Tech",
            duration: "2",
            fee: "100,000",
        },
    ];
    return (
        <>
            <div className={styles.main}>
                <section className={styles.section__hero} id="hero">
                    <div className={styles.section__hero__content}>
                        <h1 className={styles.section__hero__heading}>
                            St. Andrews Institute
                            <br />
                            of Technology and Management
                        </h1>
                        <div className={styles.section__hero__btngroup}>
                            {session.status === "authenticated" ? (
                                <Link
                                    href={"/dashboard"}
                                    className="btn btn-primary"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={"/signin"}
                                    className="btn btn-secondary"
                                >
                                    Sign in
                                </Link>
                            )}
                            {!(session.status === "authenticated") && (
                                <Link
                                    href="/apply-now"
                                    className="btn btn-primary"
                                >
                                    Apply now
                                </Link>
                            )}
                        </div>
                    </div>
                    <p className={styles.section__hero__location}>
                        <Image
                            src={
                                require("/public/static/images/location.svg")
                                    .default
                            }
                            alt="@"
                        />
                        Farrukhnagar, Harayana
                    </p>

                    <div
                        className={styles.section__hero__scrolldown}
                        onClick={() => {
                            aboutRef?.current?.scrollIntoView();
                        }}
                    >
                        <Image
                            src={
                                require("/public/static/images/scroll-down.svg")
                                    .default
                            }
                            alt="@"
                        />
                    </div>
                </section>
                <section
                    id="about"
                    ref={aboutRef}
                    className={styles.section__about}
                >
                    <div className={styles.section__about__container}>
                        <h2 className={styles.section__heading}>About us</h2>
                        <div className={styles.section__about__content}>
                            <div
                                className={styles.section__about__content__text}
                            >
                                <p>
                                    St. Andrews Institute of Technology &
                                    Management is located in the industrial hub
                                    of India Gurgaon, Delhi (NCR). It is spread
                                    across 22 acres of lush green campus with
                                    the globally acknowledged infrastructure.
                                    The classrooms are centrally air-conditioned
                                    equipped with modern technology for
                                    teaching.
                                </p>
                                <p>
                                    Good education encompasses instilling moral,
                                    aesthetic, athletic, and intellectual values
                                    in the citizens of tomorrow. St. Andrews is
                                    the best place to achieve this kind of
                                    education. Affiliated to MDU and approved by
                                    the All India Council for Technical
                                    Education (AICTE), our college has lush
                                    green surroundings which provides a
                                    conducive environment for the students to
                                    grow not only as good engineers/ managers
                                    but as world class citizens too.
                                </p>
                                <p>
                                    The teaching and non-teaching staff of the
                                    institute is a blend of senior experienced
                                    and young, dynamic faculty members devoted
                                    to the noble cause of education. We, at St.
                                    Andrews look towards creating a workforce
                                    that lives and breathes the same spirit. We
                                    give importance to practical training,
                                    self-learning, coupled with discipline,
                                    which attracts students from all over India.
                                </p>
                            </div>
                            <Image
                                src={
                                    require("/public/static/images/about-us-bg.png")
                                        .default
                                }
                                alt="saitm"
                                className={styles.section__about__content__img}
                                placeholder="blur"
                            />
                        </div>
                        <div className={styles.section__about__stats}>
                            <div className={styles.section__about__stat}>
                                <p
                                    className={
                                        styles.section__about__stat__number
                                    }
                                >
                                    <CountUp
                                        start={0}
                                        end={20000}
                                        duration={4}
                                        suffix="+"
                                        separator=","
                                        enableScrollSpy={true}
                                        scrollSpyDelay={0}
                                        scrollSpyOnce={true}
                                    >
                                        {({ countUpRef }) => (
                                            <>
                                                <span ref={countUpRef} />
                                            </>
                                        )}
                                    </CountUp>
                                </p>
                                <p
                                    className={
                                        styles.section__about__stat__text
                                    }
                                >
                                    Alumni till 2020
                                </p>
                            </div>
                            <div className={styles.section__about__stat}>
                                <p
                                    className={
                                        styles.section__about__stat__number
                                    }
                                >
                                    <CountUp
                                        start={0}
                                        end={22}
                                        duration={3}
                                        enableScrollSpy={true}
                                        scrollSpyDelay={0}
                                        scrollSpyOnce={true}
                                    >
                                        {({ countUpRef }) => (
                                            <>
                                                <span ref={countUpRef} />
                                            </>
                                        )}
                                    </CountUp>{" "}
                                    acres
                                </p>
                                <p
                                    className={
                                        styles.section__about__stat__text
                                    }
                                >
                                    Lush green campus
                                </p>
                            </div>
                            <div className={styles.section__about__stat}>
                                <p
                                    className={
                                        styles.section__about__stat__number
                                    }
                                >
                                    <CountUp
                                        start={0}
                                        end={100}
                                        duration={3}
                                        enableScrollSpy={true}
                                        scrollSpyDelay={0}
                                        scrollSpyOnce={true}
                                    >
                                        {({ countUpRef }) => (
                                            <>
                                                <span ref={countUpRef} />
                                            </>
                                        )}
                                    </CountUp>
                                </p>
                                <p
                                    className={
                                        styles.section__about__stat__text
                                    }
                                >
                                    faculty members
                                </p>
                            </div>
                            <div className={styles.section__about__stat}>
                                <p
                                    className={
                                        styles.section__about__stat__number
                                    }
                                >
                                    <CountUp
                                        start={0}
                                        end={10}
                                        duration={3}
                                        suffix="+"
                                        enableScrollSpy={true}
                                        scrollSpyDelay={0}
                                        scrollSpyOnce={true}
                                    >
                                        {({ countUpRef }) => (
                                            <>
                                                <span ref={countUpRef} />
                                            </>
                                        )}
                                    </CountUp>
                                </p>
                                <p
                                    className={
                                        styles.section__about__stat__text
                                    }
                                >
                                    years of excellence
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className={styles.collegepromo__container}>
                    <Image
                        src={
                            require("/public/static/images/college-promo.png")
                                .default
                        }
                        alt="Apply to SAITM college now"
                        className={styles.collegepromo}
                    />
                </div> */}
                <section id="courses" className={styles.section__courses}>
                    {/* <div className={styles.blurDeco}></div> */}
                    <div className={styles.section__courses__container}>
                        <h2 className={styles.section__heading}>Courses</h2>
                        <div className={styles.section__courses__cards}>
                            {courses.map(({ name, duration, fee }) => (
                                <Link
                                    href={`/apply-now?course=${name}`}
                                    className={styles.section__courses__card}
                                    key={name}
                                >
                                    <h3
                                        className={
                                            styles.section__courses__name
                                        }
                                    >
                                        {name.slice(0, 8)}
                                    </h3>
                                    <p
                                        className={
                                            styles.section__courses__duration
                                        }
                                    >
                                        {duration}
                                    </p>
                                    <p className={styles.section__courses__fee}>
                                        {fee}
                                    </p>
                                    <div
                                        className={
                                            styles.section__courses__link
                                        }
                                    >
                                        Apply now
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="contact-us" className={styles.section__contactus}>
                    {/* <div className={styles.blurDeco}></div> */}
                    <div className={styles.section__contactus__container}>
                        <Form {...formConfig} />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
