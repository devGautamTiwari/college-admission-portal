"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import Form from "@/components/Form/Form";

const defaultCallbackUrl = "/dashboard";

export default function SignUp() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const changeHandler = (e) => {
        setForm((currentForm) => ({
            ...currentForm,
            [e.target.name]: e.target.value,
        }));
    };
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/register", {
                ...form,
                userRole: "faculty",
            });

            if (data?.error) {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error?.response?.data || error?.message);
        }
    };
    const formConfig = {
        title: "Sign up",
        subtitle: "Create a faculty account here.",
        formProps: {
            autoComplete: "off",
            onSubmit: submitHandler,
        },
        formInputs: [
            {
                label: "Name",
                inputProps: {
                    id: "name",
                    type: "text",
                    name: "name",
                    placeholder: "Name...",
                    required: true,
                    value: form.name,
                    onChange: changeHandler,
                },
            },
            {
                label: "Email",
                inputProps: {
                    id: "email",
                    type: "email",
                    name: "email",
                    placeholder: "Email address...",
                    required: true,
                    value: form.email,
                    onChange: changeHandler,
                },
            },
            {
                label: "Password",
                inputProps: {
                    id: "password",
                    type: "password",
                    name: "password",
                    placeholder: "Password...",
                    required: true,
                    value: form.password,
                    onChange: changeHandler,
                },
            },
        ],
        submitBtn: {
            text: "Sign up",
            btnProps: {},
        },
        links: [
            {
                text: "Sign in",
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
