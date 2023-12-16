type InputProps = {
    children: JSX.Element | string;
    inputProps?: any;
};

export default function Input({ children, inputProps }: InputProps) {
    const { multiline, ..._inputProps } = inputProps;
    return (
        <div className={"input-group"}>
            <label htmlFor={inputProps.id}>
                {children} {`${inputProps?.required ? "*" : ""}`}
            </label>
            {multiline ? (
                <textarea {..._inputProps} />
            ) : (
                <input {..._inputProps} />
            )}
        </div>
    );
}
