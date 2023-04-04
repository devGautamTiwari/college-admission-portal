"use client";
import { useState } from "react";
import Form from "@/components/Form/Form";
import styles from "./page.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

export default function TrackApplication() {
    const [applicationNumber, setApplicationNumber] = useState<string>("");
    const [applicationData, setApplicationData] = useState<any>({
        applicationNumber: "",
        name: "",
        status: "",
        course: "",
    });
    const onSubmitHanlder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(applicationNumber);
        try {
            const { data } = await axios.get(
                `/api/track-application?applicationNumber=${applicationNumber}`
            );
            console.log(data);
            setApplicationNumber("");
            setApplicationData({
                ...data,
            });
        } catch (error: any) {
            // console.log(error?.response?.data?.message || error?.message);
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    const formProps = {
        title: "Track your application",
        subtitle:
            "Enter the application number that was sent on your email after submitting the admission form.",
        formProps: {
            onSubmit: onSubmitHanlder,
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
        links: [
            {
                text: "Sign in",
                href: "/signin",
            },
        ],
    };
    return (
        <div className={styles.container}>
            <Form {...formProps}></Form>
            {applicationData.applicationNumber && (
                <div className={styles.applicationData}>
                    <h3 className={styles.applicationData__title}>
                        Admission status
                    </h3>
                    <div className={styles.applicationData__item}>
                        <span>
                            Application no: {applicationData.applicationNumber}
                        </span>
                    </div>
                    <div className={styles.applicationData__item}>
                        <span>Status: {applicationData.status}</span>
                    </div>
                    <div className={styles.applicationData__item}>
                        <span>Name: {applicationData.name}</span>
                    </div>
                    <div className={styles.applicationData__item}>
                        <span>Course: {applicationData.course}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
