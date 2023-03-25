import Form from "@/components/Form/Form";

export default function SignIn() {
    const signInConfig = {
        title: "Sign in",
        subtitle:
            "Continue if you are an admin, faculty, or an enrolled student.",
        formProps: {
            method: "POST",
            autoComplete: "off",
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
                href: "/reset-password",
            },
        ],
    };

    return (
        <>
            <Form {...signInConfig}></Form>
        </>
    );
}
