import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
    children: React.ReactNode;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;
export default function Button({ children, ...props }: ButtonProps) {
    const { className: userClass, ...otherProps } = props;
    const className = "btn " + userClass || "";

    return (
        <button className={className} {...otherProps}>
            {children}
        </button>
    );
}
