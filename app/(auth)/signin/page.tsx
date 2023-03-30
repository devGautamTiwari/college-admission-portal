"use client";
import Form from "@/components/Form/Form";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((currentForm) => ({
            ...currentForm,
            [e.target.name]: e.target.value,
        }));
    };
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = form;

        try {
            const data = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            console.log(data);
            setForm({ email: "", password: "" });
        } catch (error) {
            console.log(error);
        }
    };

    const formConfig = {
        title: "Sign in",
        subtitle:
            "Continue if you are an admin, faculty, or an enrolled student.",
        formProps: {
            method: "POST",
            autoComplete: "off",
            onSubmit: submitHandler,
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
        ],
        submitBtn: {
            text: "Sign in",
            btnProps: {},
        },
        links: [
            {
                text: "Forgotten password?",
                href: "/forgot-password",
            },
        ],
    };

    return (
        <>
            <Form {...formConfig}></Form>
        </>
    );
}
