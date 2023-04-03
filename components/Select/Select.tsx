export default function Select({ label, selectProps = {}, options }) {
    return (
        <div className={"input-group"}>
            <label htmlFor={selectProps?.id}>
                {label} {`${selectProps?.required ? "*" : ""}`}
            </label>
            <select {...selectProps}>
                <option value={""} disabled>
                    Select a course
                </option>
                {options.map(({ type, ...optionProps }) => (
                    <option
                        value={optionProps.value}
                        key={optionProps.value}
                        {...optionProps}
                    >
                        {optionProps.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
