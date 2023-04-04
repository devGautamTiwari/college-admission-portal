"use client";

import RadioGroup from "@/components/RadioGroup/RadioGroup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
export default function Dashboard() {
    const [_applications, _setApplications] = useState([]);
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState<string>("all");
    const router = useRouter();
    const getApplications = async () => {
        const { data } = await axios.get("/api/applications");
        return data;
    };
    useEffect(() => {
        const data = getApplications();
        data.then((res) => {
            // console.log(res);
            _setApplications(res.applications);
            setApplications(res.applications);
        });
    }, []);
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
        <div>
            <div>
                <RadioGroup
                    groupLabel="Filters"
                    groupName="filter"
                    checked={filter}
                    onChange={(e) => {
                        setApplications(() => {
                            if (e.target.value === "all") return _applications;
                            return _applications.filter(
                                (application) =>
                                    application.status === e.target.value
                            );
                        });
                        setFilter(e.target.value);
                    }}
                    list={filters}
                />
            </div>
            <div className={styles.col}>
                {applications.map(
                    (
                        application: {
                            applicationNumber: string;
                            course: string;
                            name: string;
                            status: string;
                            _id: string;
                        },
                        index: number
                    ) => (
                        <button
                            key={application.applicationNumber}
                            className={styles.row}
                            onClick={() =>
                                router.push(
                                    `/dashboard/application/${application.applicationNumber}`
                                )
                            }
                        >
                            <p>{index + 1}</p>
                            <p>{application.name}</p>
                            <p>{application.course}</p>
                            <p>{application.status}</p>
                            <p>{application.applicationNumber}</p>
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
