"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StudentModal.module.scss";

const getUser = async (applicationId: string) => {
    const { data } = await axios.get(
        `/api/applications?applicationId=${applicationId}`
    );
    return data;
};

export default function StudentModal({
    applicationId,
    isOpen = false,
    onClose,
}: {
    applicationId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [user, setUser] = useState({});
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
    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser(applicationId);
            setUser(data.user);
        };
        fetchUser();
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
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                        <p>{user?.dateOfBirth}</p>
                        <p>
                            {user?.gender === "m"
                                ? "Male"
                                : user?.gender === "f"
                                ? "Female"
                                : "Prefer not to say"}
                        </p>
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
                                <p>10th Marksheet</p>
                                <iframe
                                    src={user?.metricMarksheet}
                                    frameBorder="0"
                                    width={"90%"}
                                    height={500}
                                ></iframe>
                            </>
                        )}
                        {user?.interMarksheet && (
                            <>
                                <p>12th Marksheet</p>
                                <iframe
                                    src={user?.interMarksheet}
                                    frameBorder="0"
                                    width={"90%"}
                                    height={500}
                                ></iframe>
                            </>
                        )}
                        {user?.graduationMarksheet && (
                            <>
                                <p>Graduation Marksheet</p>
                                <iframe
                                    src={user?.graduationMarksheet}
                                    frameBorder="0"
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
                        onClick={() => updateStatus("declined")}
                    >
                        Decline
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
