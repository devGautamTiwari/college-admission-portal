import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Form.module.scss";

const Input = dynamic(() => import("../Input/Input"));

type FormProps = {
    branded?: boolean;
    title?: string;
    subtitle?: string;
    titleProps?: {};
    formProps?: {};
    formInputs?: any[];
    submitBtn?: any;
    links?: any[];
    children?: React.ReactNode;
};

export default function Form({
    branded = true,
    title = "",
    subtitle = "",
    titleProps = {},
    formProps = { autoComplete: "on" },
    formInputs = [],
    submitBtn,
    links = [],
    children = null,
}: FormProps) {
    return (
        <div className={styles.content}>
            {branded && (
                <Image
                    src={
                        require("/public/static/images/saitm-logo.png").default
                    }
                    alt="saitm"
                    className={styles.logo}
                    width={200}
                    height={174}
                    priority
                />
            )}
            {title && (
                <div className={styles.header}>
                    <h2 className={styles.title} {...titleProps}>
                        {title}
                    </h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            )}

            <form className={styles.form} {...formProps}>
                {formInputs.map(({ label, inputProps }) => (
                    <Input inputProps={inputProps} key={inputProps.name}>
                        {label}
                    </Input>
                ))}
                {children}
                {submitBtn && (
                    <button
                        className="btn btn-primary"
                        type="submit"
                        {...submitBtn.btnProps}
                    >
                        {submitBtn.text}
                    </button>
                )}
                <div className={styles.links__container}>
                    {links.map((link) => (
                        <a
                            href={link.href}
                            className={styles.link}
                            key={link.href}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </form>
        </div>
    );
}
