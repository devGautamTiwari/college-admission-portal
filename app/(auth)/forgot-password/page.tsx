"use client";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
const Form = dynamic(() => import("@/components/Form/Form"));

export default function ForgotPassword() {
    const [form, setForm] = useState({ email: "", userRole: "" });
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((currentForm) => ({
            ...currentForm,
            [e.target.name]: e.target.value,
        }));
    };
    const sendResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/forgot-password", {
                ...form,
            });

            console.log(data);
        } catch (error: any) {
            console.log(error?.response?.data || error?.message);
        }
    };

    const forgotPasswordConfig = {
        title: "Reset your Password",
        subtitle:
            "A link to reset your password will be sent to your email address.",
        formProps: {
            // autoComplete: "off",
            onSubmit: sendResetEmail,
        },
        formInputs: [
            {
                label: "Email",
                inputProps: {
                    id: "email",
                    type: "email",
                    name: "email",
                    placeholder: "Email address...",
                    required: true,
                    value: form.email,
                    onChange: onChangeHandler,
                },
            },
        ],
        submitBtn: {
            text: "Reset password",
            btnProps: {},
        },
        links: [
            {
                text: "Back to sign in",
                href: "/signin",
            },
        ],
    };
    const roleList = [
        {
            label: "Admin",
            inputProps: {
                id: "admin",
                value: "admin",
                required: true,
            },
        },
        {
            label: "Faculty",
            inputProps: {
                id: "faculty",
                value: "faculty",
                required: true,
            },
        },
        {
            label: "Student",
            inputProps: {
                id: "student",
                value: "student",
                required: true,
            },
        },
    ];
    return (
        <>
            <Form {...forgotPasswordConfig}>
                <RadioGroup
                    groupLabel={"Role"}
                    groupName="userRole"
                    checked={form.userRole}
                    onChange={onChangeHandler}
                    list={roleList}
                />
            </Form>
        </>
    );
}
