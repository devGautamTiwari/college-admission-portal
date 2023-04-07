"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./StudentModal.module.scss";

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    aadhaar: string;
    dateOfBirth: string;
    validEmail: boolean;
    userRole: string;
    paymentStatus: string;
    applicationNumber: string;
    status: string;
    course: string;
    courseType: string;
    metricMarksheet: string;
    interMarksheet?: string;
    graduationMarksheet?: string;
}
const emptyUser: User = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    aadhaar: "",
    dateOfBirth: "",
    validEmail: false,
    userRole: "",
    paymentStatus: "",
    applicationNumber: "",
    status: "",
    course: "",
    courseType: "",
    metricMarksheet: "",
    interMarksheet: "",
    graduationMarksheet: "",
};

export default function StudentModal({
    applicationId = "",
    isOpen = false,
    onClose,
}: {
    applicationId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [user, setUser] = useState<User>(emptyUser);
    const updateStatus = async (status: string) => {
        if (status === user?.status) {
        } else {
            const { data } = await axios.put(`/api/applications`, {
                applicationId,
                status,
            });
            console.log(data);
        }
        onClose();
    };

    const getUser = async (applicationId: string) => {
        const { data } = await axios.get(
            `/api/applications?applicationId=${applicationId}`
        );
        setUser(data.user);
        return data;
    };

    useEffect(() => {
        getUser(applicationId);
        return () => {};
    }, [applicationId]);

    return (
        <div
            className={`${styles.container} ${
                isOpen ? "" : styles["container--close"]
            }`}
        >
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <h2>Student Details</h2>
                    <div
                        role={"button"}
                        onClick={onClose}
                        className={styles.modal__closebtn}
                    >
                        <Image
                            src={
                                require("/public/static/images/close.svg")
                                    .default
                            }
                            alt="close
                    "
                        />
                    </div>
                </div>

                <div className={styles.modal__body}>
                    <div className={styles.modal__body__section}>
                        <h3>Personal details</h3>
                        <p>Name: {user?.name}</p>
                        <p>Email: {user?.email}</p>
                        <p>Phone: {user?.phone}</p>
                        <p>Aadhaar: {user?.aadhaar}</p>
                        <p>Date of Birth: {user?.dateOfBirth}</p>
                        <p>Gender: {user?.gender}</p>
                    </div>
                    <div className={styles.modal__body__section}>
                        <h3>Course details</h3>
                        <p>{user?.course}</p>
                        <p>
                            {user?.courseType === "ug"
                                ? "Undergraduate"
                                : user?.courseType === "pg"
                                ? "Postgraduate"
                                : user?.courseType === "diploma"
                                ? "Diploma"
                                : "Unknown"}
                        </p>
                    </div>
                    <div className={styles.modal__body__section}>
                        <h3>Academic details</h3>
                        {user?.metricMarksheet && (
                            <>
                                <Link href={user?.metricMarksheet}>
                                    10th Marksheet
                                </Link>
                                <iframe
                                    src={user?.metricMarksheet}
                                    width={"90%"}
                                    height={500}
                                ></iframe>
                            </>
                        )}
                        {user?.interMarksheet && (
                            <>
                                <Link href={user?.interMarksheet}>
                                    12th Marksheet
                                </Link>
                                <iframe
                                    src={user?.interMarksheet}
                                    width={"90%"}
                                    height={500}
                                ></iframe>
                            </>
                        )}
                        {user?.graduationMarksheet && (
                            <>
                                <Link href={user?.graduationMarksheet}>
                                    Graduation Marksheet
                                </Link>
                                <iframe
                                    src={user?.graduationMarksheet}
                                    width={"90%"}
                                    height={500}
                                ></iframe>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.modal__footer}>
                    <button
                        type="button"
                        className={"btn btn-secondary"}
                        onClick={() => updateStatus("pending")}
                    >
                        Pending
                    </button>
                    <button
                        type="button"
                        className={"btn btn-secondary"}
                        onClick={() => updateStatus("rejected")}
                    >
                        Rejected
                    </button>
                    <button
                        type="button"
                        className={"btn btn-primary"}
                        onClick={() => updateStatus("approved")}
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}
