import Form from "@/components/Form/Form";

export default function ResetPassword() {
    const signInConfig = {
        title: "Reset your Password",
        subtitle:
            "A link to reset your password will be sent to your email address.",
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
            <Form {...signInConfig}></Form>
        </>
    );
}
