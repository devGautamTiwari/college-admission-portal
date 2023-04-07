"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import RadioGroup from "../RadioGroup/RadioGroup";
import StudentModal from "../StudentModal/StudentModal";
import styles from "./FacultyDashboard.module.scss";

export default function FacultyDashboard() {
    const [_applications, _setApplications] = useState<[]>([]);
    const [currentApplicationId, setCurrentApplicationId] =
        useState<string>("");
    const [filter, setFilter] = useState<string>("all");
    const [applications, setApplications] = useReducer(
        (_oldVal: [], newVal: []): any => {
            if (filter === "all") return _applications;
            return newVal.filter(
                (application: {
                    applicationNumber: string;
                    course: string;
                    name: string;
                    status: string;
                    email: string;
                    _id: string;
                }) => application.status === filter
            );
        },
        []
    );

    const getApplications = async () => {
        const { data } = await axios.get("/api/applications");
        _setApplications(data.applications);
        return data;
    };

    useEffect(() => {
        getApplications();
    }, [currentApplicationId]);

    useEffect(() => {
        setApplications(_applications);
    }, [_applications, filter]);
    const filters = [
        {
            label: "All",
            inputProps: {
                id: "all",
                value: "all",
            },
        },

        {
            label: "Rejected",
            inputProps: {
                id: "rejected",
                value: "rejected",
            },
        },
        {
            label: "Pending",
            inputProps: {
                id: "pending",
                value: "pending",
            },
        },
        {
            label: "Approved",
            inputProps: {
                id: "approved",
                value: "approved",
            },
        },
    ];
    return (
        <div className={styles.container}>
            <h1>Admission requests</h1>
            <div className={styles.headerRow}>
                <RadioGroup
                    groupLabel="Filter"
                    groupName="filter"
                    checked={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    list={filters}
                />
                <div
                    className={styles.refresh}
                    onClick={() => getApplications()}
                    title="Refresh applications"
                >
                    <Image
                        src={
                            require("/public/static/images/refresh.svg").default
                        }
                        width={32}
                        height={32}
                        alt=""
                        aria-hidden="true"
                    />
                </div>
            </div>
            <div className={styles.table__container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Application No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length ? (
                            applications.map(
                                (
                                    application: {
                                        applicationNumber: string;
                                        course: string;
                                        name: string;
                                        status: string;
                                        email: string;
                                        _id: string;
                                    },
                                    index: number
                                ) => (
                                    <tr
                                        key={application.applicationNumber}
                                        onClick={() => {
                                            setCurrentApplicationId(
                                                application._id
                                            );
                                        }}
                                    >
                                        <td style={{ minWidth: "200px" }}>
                                            {application.name}
                                        </td>
                                        <td>{application.course}</td>
                                        <td>{application.status}</td>
                                        <td style={{ minWidth: "165px" }}>
                                            {application.applicationNumber}
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: "center" }}>
                                    Nothing to show here
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <StudentModal
                applicationId={currentApplicationId}
                isOpen={!!currentApplicationId}
                onClose={() => setCurrentApplicationId("")}
            />
        </div>
    );
}
