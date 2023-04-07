"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import RadioGroup from "../RadioGroup/RadioGroup";
import styles from "./StudentDashboard.module.scss";

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

export default function StudentDashboard() {
    const session = useSession();
    const [user, setUser] = useState<User>(emptyUser);
    const [isFormEditing, setIsFormEditing] = useState(false);
    const [update, setUpdate] = useState({});
    const getUser = useCallback(async () => {
        const { data } = await axios.post("/api/user", {
            email: session?.data?.user?.email,
        });
        // console.log(data);
        setUser(data.user);
        return data;
    }, [session]);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFormEditing) {
            setUser((currentUser) => ({
                ...currentUser,
                [e.target.name]: e.target.value,
            }));
            setUpdate((currentUser) => ({
                ...currentUser,
                [e.target.name]: e.target.value,
            }));
        }
    };
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(update);
        const { data } = await axios.put("/api/user", {
            _id: user?._id,
            ...update,
        });

        console.log(data);
        setIsFormEditing((current) => !current);
    };

    useEffect(() => {
        getUser();
    }, [getUser]);
    const formConfig = {
        branded: false,
        formProps: {
            autoComplete: "off",
            onSubmit: onSubmitHandler,
        },
    };
    const genderList = [
        {
            label: "Female",
            inputProps: {
                id: "female",
                value: "Female",
                required: true,
                disabled: !isFormEditing,
            },
        },
        {
            label: "Male",
            inputProps: {
                id: "male",
                value: "Male",
                required: true,
                disabled: !isFormEditing,
            },
        },
        {
            label: "Prefer not to say",
            inputProps: {
                id: "pnts",
                value: "Prefer not to say",
                required: true,
                disabled: !isFormEditing,
            },
        },
    ];
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>
                Profile
                <div
                    className={styles.refresh}
                    onClick={() => getUser()}
                    title="Refresh profile"
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
            </h1>
            <Form {...formConfig}>
                {/* Personal Information */}
                <div className={styles.form__body}>
                    <h2 className={styles.informationCard__heading}>
                        Personal Information
                    </h2>
                    <Input
                        inputProps={{
                            id: "name",
                            name: "name",
                            type: "text",
                            value: user?.name,
                            onChange: onChangeHandler,
                            disabled: !isFormEditing,
                            required: true,
                        }}
                    >
                        Name
                    </Input>
                    <Input
                        inputProps={{
                            id: "email",
                            name: "email",
                            type: "email",
                            value: user?.email,
                            onChange: onChangeHandler,
                            disabled: !isFormEditing,
                            required: true,
                        }}
                    >
                        Email
                    </Input>
                    <Input
                        inputProps={{
                            id: "Phone",
                            name: "phone",
                            type: "tel",
                            value: user?.phone,
                            onChange: onChangeHandler,
                            disabled: !isFormEditing,
                            required: true,
                        }}
                    >
                        Phone
                    </Input>
                    <RadioGroup
                        groupLabel="Gender"
                        groupName="gender"
                        checked={user?.gender}
                        onChange={onChangeHandler}
                        list={genderList}
                    />
                    <Input
                        inputProps={{
                            id: "aadhaar",
                            name: "aadhaar",
                            type: "text",
                            value: user?.aadhaar,
                            onChange: onChangeHandler,
                            disabled: !isFormEditing,
                            pattern: "[0-9]{12}",
                            maxLength: 12,
                            required: true,
                        }}
                    >
                        Aadhaar
                    </Input>
                    <Input
                        inputProps={{
                            id: "dateOfBirth",
                            name: "dateOfBirth",
                            type: "date",
                            value: user?.dateOfBirth,
                            onChange: onChangeHandler,
                            disabled: !isFormEditing,
                            required: true,
                        }}
                    >
                        Date of Birth
                    </Input>
                </div>
                <div className={styles.btnGroup}>
                    {isFormEditing ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-secondary btn-fullwidth"
                                onClick={() =>
                                    setIsFormEditing((current) => !current)
                                }
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-fullwidth"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary btn-fullwidth"
                            onClick={() =>
                                setIsFormEditing((current) => !current)
                            }
                        >
                            Edit
                        </button>
                    )}
                </div>
            </Form>
            <div className={styles.innerContainer}>
                {/* Account Information */}
                <div className={styles.informationCard}>
                    <h2 className={styles.informationCard__heading}>
                        Account Information
                    </h2>
                    <div className={styles.informationCard__body}>
                        <Input
                            inputProps={{
                                id: "applicationNumber",
                                name: "applicationNumber",
                                type: "text",
                                defaultValue: user?.validEmail ? "Yes" : "No",
                                disabled: true,
                            }}
                        >
                            Email verified
                        </Input>
                        <Input
                            inputProps={{
                                id: "applicationNumber",
                                name: "applicationNumber",
                                type: "text",
                                defaultValue: user?.userRole,
                                disabled: true,
                            }}
                        >
                            User role
                        </Input>
                    </div>
                </div>

                {/* Application Information */}
                <div className={styles.informationCard}>
                    <h2 className={styles.informationCard__heading}>
                        Application Information
                    </h2>
                    <div className={styles.informationCard__body}>
                        <Input
                            inputProps={{
                                id: "applicationNumber",
                                name: "applicationNumber",
                                type: "text",
                                defaultValue: user?.applicationNumber,
                                disabled: true,
                            }}
                        >
                            Application Number
                        </Input>
                        <Input
                            inputProps={{
                                id: "applicationStatus",
                                name: "applicationStatus",
                                type: "text",
                                defaultValue: user?.status,
                                disabled: true,
                            }}
                        >
                            Application Status
                        </Input>
                        {user?.status === "approved" && (
                            <p>Application fee status: {user?.paymentStatus}</p>
                        )}
                    </div>
                </div>

                {/* Course Information */}
                <div className={styles.informationCard}>
                    <h2 className={styles.informationCard__heading}>
                        Course Information
                    </h2>
                    <div className={styles.informationCard__body}>
                        <Input
                            inputProps={{
                                id: "course",
                                name: "course",
                                type: "text",
                                defaultValue: user?.course,
                                disabled: true,
                            }}
                        >
                            Course
                        </Input>
                        <Input
                            inputProps={{
                                id: "course",
                                name: "course",
                                type: "text",
                                defaultValue: user?.courseType,
                                disabled: true,
                                readOnly: true,
                            }}
                        >
                            Course Type
                        </Input>
                    </div>
                </div>
                {/* Academics Information */}
                <div className={styles.informationCard}>
                    <h2 className={styles.informationCard__heading}>
                        Academics Information
                    </h2>
                    <div className={styles.informationCard__body}>
                        {user?.metricMarksheet && (
                            <div>
                                <p>10th Marksheet</p>
                                <iframe
                                    src={user?.metricMarksheet}
                                    width={"100%"}
                                    height={400}
                                ></iframe>
                            </div>
                        )}
                        {user?.interMarksheet && (
                            <div>
                                <p>12th Marksheet</p>
                                <iframe
                                    src={user?.interMarksheet}
                                    width={"100%"}
                                    height={400}
                                ></iframe>
                            </div>
                        )}
                        {user?.graduationMarksheet && (
                            <div>
                                <p>Graduation Marksheet</p>
                                <iframe
                                    src={user?.graduationMarksheet}
                                    width={"100%"}
                                    height={400}
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
