"use client";
import Form from "@/components/Form/Form";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const sendResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/forgot-password", {
                email,
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const forgotPasswordConfig = {
        title: "Reset your Password",
        subtitle:
            "A link to reset your password will be sent to your email address.",
        formProps: {
            autoComplete: "off",
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
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
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

    return (
        <>
            <Form {...forgotPasswordConfig}></Form>
        </>
    );
}
