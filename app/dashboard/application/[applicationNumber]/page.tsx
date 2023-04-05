"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "/home/shakti/Desktop/college-admission-portal/app/dashboard/page.module.scss"


interface Props {
    params: {
        applicationNumber: string;
    };
}

interface ApplicationData {
    name: string;
    email: string;
    userRole: string;
    aadhaar: string;
    dateOfBirth: string;
    gender: string;
    course: string;
    courseType: string;
    metricMarksheet: string;
    interMarksheet?: string;
    graduationMarksheet?: string;
}

const emptyApplicationData: ApplicationData = {
    name: "",
    email: "",
    userRole: "",
    aadhaar: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    courseType: "",
    metricMarksheet: "",
    interMarksheet: "",
    graduationMarksheet: "",
};
export default function ApplicationPage({ params }: Props) {
    const router = useRouter();

    const { applicationNumber } = params;
    const [application, setApplication] =
        useState<ApplicationData>(emptyApplicationData);

    const getApplication = useCallback(async () => {
        const { data } = await axios.get(
            `/api/applications?applicationNumber=${applicationNumber}`
        );
        return data;
    }, [applicationNumber]);

    useEffect(() => {
        const data = getApplication();
        data.then((res) => {
            console.log(res);
            setApplication(res.user);
        }).catch((err) => console.log(err));
    }, [getApplication]);

    return (
        <div >
            <p>Name: {application.name}</p>
            <div>
                Email:
                <a href={`mailto:${application.email}`}> {application.email}</a>
            </div>
            <p>User role: {application.userRole}</p>
            <p>Aadhaar: {application.aadhaar}</p>
            <p>Date of Birth: {application.dateOfBirth}</p>
            <p>
                Gender:{" "}
                {application.gender === "m"
                    ? "Male"
                    : application.gender === "f"
                    ? "Female"
                    : "Prefer not to say"}
            </p>

            <p>Course: {application.course}</p>
            <p>CourseType: {application.courseType}</p>
            <div>
                <p>10th marksheet: </p>
                <iframe
                    frameBorder={0}
                    src={application.metricMarksheet}
                    height={500}
                ></iframe>
            </div>

            {application.interMarksheet && (
                <div>
                    <p>12th marksheet: </p>
                    <iframe
                        frameBorder={0}
                        src={application.interMarksheet}
                        height={500}
                    ></iframe>
                </div>
            )}
            {application.graduationMarksheet && (
                <div>
                    <p>Graduation marksheet: </p>
                    <iframe
                        frameBorder={0}
                        src={application.graduationMarksheet}
                        height={500}
                    ></iframe>
                </div>
            )}
            <button type="button" onClick={() => router.push("/dashboard")}>
                &lt;- Back
            </button>
        </div>
    );
}
