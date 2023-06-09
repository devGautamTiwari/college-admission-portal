"use client";
import { useState } from "react";
import Form from "@/components/Form/Form";
import styles from "./page.module.scss";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
type ApplicationData = {
    applicationNumber: string;
    name: string;
    status: string;
    course: string;
};
export default function TrackApplication() {
    const [applicationNumber, setApplicationNumber] = useState<string>("");
    const [applicationData, setApplicationData] = useState<ApplicationData>({
        applicationNumber: "",
        name: "",
        status: "",
        course: "",
    });
    const [loading, setLoading] = useState(false);
    const getStatus = async (applicationNumber: string) => {
        const { data } = await axios.get(
            `/api/track-application?applicationNumber=${applicationNumber}`
        );
        console.log("data");

        return data;
    };
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = await getStatus(applicationNumber);
            setApplicationNumber("");
            setApplicationData({
                ...data,
            });
        } catch (err) {
            const error = err as AxiosError;
            const errorData = error?.response?.data as { message: string };
            console.log(errorData?.message || error?.message);
            toast.error(errorData?.message || error?.message);
        } finally {
            setLoading(false);
        }
    };

    const formProps = {
        title: "Track an application",
        subtitle:
            "Enter the application number that was sent on your email after submitting the admission form.",
        titleProps: { style: { fontSize: "2.25em" } },
        formProps: {
            onSubmit: onSubmitHandler,
        },
        formInputs: [
            {
                label: "Application number",
                inputProps: {
                    id: "applicationNumber",
                    name: "applicationNumber",
                    type: "text",
                    required: true,
                    placeholder: "Application number...",
                    value: applicationNumber,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setApplicationNumber(e.target.value),
                },
            },
        ],
        submitBtn: {
            text: "Submit",
        },
        links: [
            {
                text: "Sign in",
                href: "/signin",
            },
        ],
    };
    return (
        <>
            {loading && <LoadingComponent />}
            <Form {...formProps}></Form>
            {applicationData.applicationNumber && (
                <div className={styles.applicationData}>
                    {/* <h3 className={styles.applicationData__title}>
                        Admission status
                    </h3> */}
                    <div className={styles.applicationData__status}>
                        {
                            <Image
                                src={
                                    applicationData.status === "rejected"
                                        ? require("/public/static/images/close--outline.svg")
                                              .default
                                        : applicationData.status === "approved"
                                        ? require("/public/static/images/checkmark--outline.svg")
                                              .default
                                        : require("/public/static/images/clock.svg")
                                              .default
                                }
                                width={58}
                                height={58}
                                alt=""
                                aria-hidden="true"
                            />
                        }
                        <div className={styles.applicationData__item}>
                            <h2>
                                {applicationData.status
                                    .slice(0, 1)
                                    .toUpperCase() +
                                    applicationData.status
                                        .slice(1)
                                        .toLowerCase()}
                            </h2>
                        </div>
                    </div>
                    <div className={styles.applicationData__item}>
                        <span>
                            Dear <strong>{applicationData.name}</strong>
                            ,<br />
                            Your admission request with application number{" "}
                            <strong>
                                {applicationData.applicationNumber}
                            </strong>{" "}
                            is {applicationData.status}.
                        </span>
                    </div>

                    <div
                        className={styles.applicationData__refresh}
                        onClick={() =>
                            getStatus(applicationData.applicationNumber)
                        }
                        title="Refresh status"
                    >
                        <Image
                            src={
                                require("/public/static/images/refresh.svg")
                                    .default
                            }
                            alt=""
                            aria-hidden="true"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
