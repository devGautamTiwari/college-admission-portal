"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@/components/Form/Form";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { AxiosError } from "axios";

export default function SignIn() {
    const [form, setForm] = useState({ email: "", password: "", role: "" });
    const [loading, setLoading] = useState(false);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((currentForm) => ({
            ...currentForm,
            [e.target.name]: e.target.value,
        }));
    };
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const { email, password, role } = form;

        try {
            const data = await signIn("credentials", {
                redirect: false,
                email,
                password,
                userRole: role,
            });

            console.log(data);
            setForm({ email: "", password: "", role: "" });
        } catch (err) {
            const error = err as AxiosError;
            console.log(error?.response?.data || error?.message);
        } finally {
            setLoading(false);
        }
    };

    const formConfig = {
        title: "Sign in",
        subtitle:
            "Continue if you are an admin, faculty, or an enrolled student.",
        formProps: {
            // autoComplete: "off",
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
        },
        links: [
            {
                text: "Forgotten password?",
                href: "/forgot-password",
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
            {loading && <LoadingComponent />}
            <Form {...formConfig}>
                <RadioGroup
                    groupLabel={"Role"}
                    groupName="role"
                    checked={form.role}
                    onChange={onChangeHandler}
                    list={roleList}
                />
            </Form>
        </>
    );
}
