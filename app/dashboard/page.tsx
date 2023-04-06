"use client";

import RadioGroup from "@/components/RadioGroup/RadioGroup";
import StudentModal from "@/components/StudentModal/StudentModal";
import axios from "axios";

import { useEffect, useReducer, useState } from "react";
import styles from "./page.module.scss";

const getApplications = async () => {
    const { data } = await axios.get("/api/applications");
    return data;
};

export default function Dashboard() {
    const [_applications, _setApplications] = useState<[]>([]);
    const [currentApplicationId, setCurrentApplicationId] =
        useState<string>("");
    const [filter, setFilter] = useState<string>("pending");
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
    useEffect(() => {
        const data = getApplications();
        data.then((res) => {
            _setApplications(res.applications);
        });
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
            label: "Declined",
            inputProps: {
                id: "declined",
                value: "declined",
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
            <div>
                <RadioGroup
                    groupLabel="Filter"
                    groupName="filter"
                    checked={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    list={filters}
                />
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
