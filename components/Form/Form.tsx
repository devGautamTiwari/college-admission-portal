import Image from "next/image";
import styles from "./Form.module.scss";
import logo from "/public/static/saitm-logo.png";

interface FormProps {
    title?: string;
    subtitle?: string;
    formProps?: {};
    formInputs?: any[];
    submitBtn?: any;
    links?: any[];
}

export default function Form({
    title = "",
    subtitle = "",
    formProps = { autoComplete: "on" },
    formInputs = [],
    submitBtn = { text: "Submit" },
    links = [],
}: FormProps) {
    return formInputs.length > 0 ? (
        <div className={styles.content}>
            <Image
                src={logo}
                alt="saitm"
                className={styles.logo}
                width={200}
                height={174}
                priority
            />

            <div className={styles.header}>
                <h2
                    className={styles.title}
                    style={{
                        fontSize: title.length > 10 ? "1.625em" : "3em",
                    }}
                >
                    {title}
                </h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>

            <form className={styles.form} {...formProps}>
                {formInputs.map(({ label, inputProps }) => (
                    <div className="input-group" key={inputProps.id}>
                        <label htmlFor={inputProps.id}>{label}</label>
                        <input {...inputProps} />
                    </div>
                ))}

                <button
                    className="btn btn-primary"
                    type="submit"
                    {...submitBtn.btnProps}
                >
                    {submitBtn.text}
                </button>
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
    ) : null;
}
