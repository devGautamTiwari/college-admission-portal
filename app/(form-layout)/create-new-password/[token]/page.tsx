"use client";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Form = dynamic(() => import("@/components/Form/Form"));
type Props = {
    params: {
        token: string;
    };
};
export default function ResetPassword({ params }: Props) {
    const { token } = params;
    const [form, setForm] = useState({ password: "", confirmPassword: "" });
    const router = useRouter();
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((currentForm) => ({
            ...currentForm,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { password, confirmPassword } = form;

            const { data } = await axios.put(
                `/api/create-new-password/${token}`,
                { password, confirmPassword },
                config
            );
            console.log(data.message);
            setForm({ password: "", confirmPassword: "" });
            setTimeout(() => router.replace("/signin"), 3000);
        } catch (err) {
            const error = err as AxiosError;
            console.log(error?.response?.data || error?.message);
        }
    };

    const formConfig = {
        title: "Create New Password",
        // subtitle:
        //     "Continue if you are an admin, faculty, or an enrolled student.",
        formProps: {
            autoComplete: "off",
            onSubmit: handleSubmit,
        },
        formInputs: [
            {
                label: "Password",
                inputProps: {
                    id: "password",
                    type: "password",
                    name: "password",
                    placeholder: "Password...",
                    required: true,
                    value: form.password,
                    onChange: onChangeHandler,
                },
            },
            {
                label: "Confirm Password",
                inputProps: {
                    id: "confirm-password",
                    type: "password",
                    name: "confirmPassword",
                    placeholder: "Confirm Password...",
                    required: true,
                    value: form.confirmPassword,
                    onChange: onChangeHandler,
                },
            },
        ],
        submitBtn: {
            text: "Create new password",
            btnProps: {},
        },
        links: [
            {
                text: "Back to Sign in",
                href: "/signin",
            },
        ],
    };

    return (
        <>
            <Form {...formConfig} />
        </>
    );
}
