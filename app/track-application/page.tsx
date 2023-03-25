import Form from "@/components/Form/Form";

import styles from "./page.module.scss";
export default function TrackApplication() {
    const formProps = {
        title: "Track your application",
        subtitle:
            "Enter the application number that was sent to you on email/phone, when you submitted the application.",
        formInputs: [
            {
                label: "Application number",
                inputProps: {
                    id: "application-number",
                    name: "application-number",
                    type: "text",
                    required: true,
                    placeholder: "Application number...",
                },
            },
        ],
        links: [
            {
                text: "Sign in",
                href: "/signin",
            },
        ],
    };
    return (
        <div className={styles.container}>
            <Form {...formProps}></Form>
        </div>
    );
}
