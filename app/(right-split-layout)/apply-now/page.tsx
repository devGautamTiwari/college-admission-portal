"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios, { AxiosError } from "axios";
import Form from "@/components/Form/Form";
import { uploadFile as getDownloadURL } from "@/lib/firebase";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
const RadioGroup = dynamic(() => import("@/components/RadioGroup/RadioGroup"));
const Input = dynamic(() => import("@/components/Input/Input"));
const Select = dynamic(() => import("@/components/Select/Select"));

type FormState = {
    name: string;
    email: string;
    phone: string;
    aadhaar: string;
    dateOfBirth: string;
    gender: string;
    course: string;
    courseType: string;
    metricMarksheet: undefined | File;
    interMarksheet: undefined | File;
    graduationMarksheet: undefined | File;
};

const MIN_AGE = 18;
const MAX_AGE = 40;
const emptyForm = {
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    courseType: "",
    metricMarksheet: undefined,
    interMarksheet: undefined,
    graduationMarksheet: undefined,
};
const genderList = [
    {
        label: "Female",
        inputProps: {
            id: "female",
            value: "Female",
            required: true,
        },
    },
    {
        label: "Male",
        inputProps: {
            id: "male",
            value: "Male",
        },
    },
    {
        label: "Prefer not to say",
        inputProps: {
            id: "pnts",
            value: "Prefer not to say",
        },
    },
];
const courses = [
    {
        name: "D. Pharma",
        value: "D. Pharma",
        type: "diploma",
    },
    {
        name: "B. Tech",
        value: "B. Tech",
        type: "ug",
    },
    {
        name: "BCA",
        value: "BCA",
        type: "ug",
    },
    {
        name: "BBA",
        value: "BBA",
        type: "ug",
    },
    {
        name: "MBA",
        value: "MBA",
        type: "pg",
    },
];

export default function ApplyNowPage() {
    const [form, setForm] = useState<FormState>(emptyForm);
    const [loading, setLoading] = useState(false);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file") {
            if (!e.target.files?.length) return;
            setForm({
                ...form,
                [e.target.name]: e.target.files[0],
            });
        } else if (e.target.name === "course") {
            const courseType =
                courses[
                    courses.findIndex(
                        (course) => course.value === e.target.value
                    )
                ].type;
            setForm({
                ...form,
                [e.target.name]: e.target.value,
                courseType,
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    };
    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();
        setLoading(true);
        try {
            let metricMarksheetUrl = "";
            let interMarksheetUrl = "";
            let graduationMarksheetUrl = "";

            if (!form.metricMarksheet) {
                toast.error("Please upload 10th marksheet");
                return;
            }

            metricMarksheetUrl = await getDownloadURL(form.metricMarksheet);
            if (form.courseType === "diploma") {
                if (form.interMarksheet) {
                    interMarksheetUrl = await getDownloadURL(
                        form.interMarksheet
                    );
                }
            } else if (form.courseType === "ug") {
                if (form.interMarksheet) {
                    interMarksheetUrl = await getDownloadURL(
                        form.interMarksheet
                    );
                }
            } else if (form.courseType === "pg") {
                if (!form.graduationMarksheet) {
                    toast.error("Please upload your Graduation marksheet");
                    return;
                }
                graduationMarksheetUrl = await getDownloadURL(
                    form.graduationMarksheet
                );
            } else {
                toast.error("Please select/reselect a course");
                return;
            }

            const { data } = await axios.post("/api/apply-now", {
                ...form,
                metricMarksheet: metricMarksheetUrl,
                interMarksheet: interMarksheetUrl,
                graduationMarksheet: graduationMarksheetUrl,
            });

            console.log(data);
            setForm(emptyForm);
            toast.success("Admission request sent successfully!");
        } catch (err) {
            const error = err as AxiosError;
            console.log(error?.response?.data || error?.message);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };
    const formConfig = {
        branded: false,
        title: "Admission form",
        subtitle: "Fill the form to apply for admission in SAITM",
        titleProps: { style: { fontSize: "2.5em" } },
        formProps: {
            onSubmit: onSubmitHandler,
        },
        formInputs: [
            {
                label: "Full Name",
                inputProps: {
                    type: "text",
                    name: "name",
                    placeholder: "Full name",
                    required: true,
                    id: "name",
                    value: form.name,
                    onChange: onChangeHandler,
                },
            },
            {
                label: "Email",
                inputProps: {
                    type: "email",
                    name: "email",
                    placeholder: "Email",
                    required: true,
                    id: "email",
                    value: form.email,
                    onChange: onChangeHandler,
                },
            },
            {
                label: "Phone",
                inputProps: {
                    type: "tel",
                    name: "phone",
                    placeholder: "Phone",
                    required: true,
                    id: "phone",
                    value: form.phone,
                    onChange: onChangeHandler,
                },
            },
            {
                label: "Aadhaar",
                inputProps: {
                    type: "text",
                    name: "aadhaar",
                    placeholder: "Aadhaar number",
                    required: true,
                    id: "aadhaar",
                    maxLength: 12,
                    pattern: "[0-9]{12}",
                    value: form.aadhaar,
                    onChange: onChangeHandler,
                },
            },
            {
                label: "Date of Birth",
                inputProps: {
                    type: "date",
                    name: "dateOfBirth",
                    placeholder: "Date of Birth",
                    required: true,
                    id: "dateOfBirth",
                    min: `${new Date().getFullYear() - MAX_AGE}-01-01`,
                    max: `${new Date().getFullYear() - MIN_AGE}-12-31`,
                    value: form.dateOfBirth,
                    onChange: onChangeHandler,
                },
            },
        ],
        submitBtn: {
            text: "Submit",
        },
    };

    return (
        <>
            {loading && <LoadingComponent />}
            <Form {...formConfig}>
                <RadioGroup
                    groupLabel="Gender"
                    groupName="gender"
                    checked={form.gender}
                    onChange={onChangeHandler}
                    list={genderList}
                />
                <Select
                    label="Courses"
                    selectProps={{
                        name: "course",
                        id: "course",
                        value: form.course,
                        onChange: onChangeHandler,
                        required: true,
                    }}
                    options={courses}
                ></Select>
                <Input
                    inputProps={{
                        type: "file",
                        id: "metricMarksheet",
                        name: "metricMarksheet",
                        accept: ".pdf,image/*",
                        required: true,
                        onChange: onChangeHandler,
                    }}
                >
                    10th marksheet
                </Input>
                <Input
                    inputProps={{
                        type: "file",
                        id: "interMarksheet",
                        name: "interMarksheet",
                        accept: ".pdf,image/*",
                        required:
                            form.courseType === "ug" || form.courseType === "pg"
                                ? true
                                : false,
                        onChange: onChangeHandler,
                    }}
                >
                    12th marksheet
                </Input>
                {courses[
                    courses.findIndex((course) => course.value === form.course)
                ]?.type === "pg" && (
                    <Input
                        inputProps={{
                            type: "file",
                            id: "graduationMarksheet",
                            name: "graduationMarksheet",
                            required: true,
                            accept: ".pdf,image/*",
                            onChange: onChangeHandler,
                        }}
                    >
                        UG degree
                    </Input>
                )}
            </Form>
        </>
    );
}
