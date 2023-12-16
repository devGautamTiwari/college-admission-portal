import styles from "./RadioGroup.module.scss";

export const Radio = ({
    label,
    inputProps,
}: {
    label: string;
    inputProps: any;
}) => {
    return (
        <div className={styles.radio}>
            <input type="radio" {...inputProps} />
            <label htmlFor={inputProps.id}>{label}</label>
        </div>
    );
};

export default function RadioGroup({
    groupLabel,
    groupName,
    checked = "",
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    },
    list,
}: {
    groupLabel: string;
    groupName: string;
    checked?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    list: any;
}) {
    return (
        <div className={"input-group"}>
            <label htmlFor={list[0].inputProps.id}>
                {groupLabel} {list[0].inputProps.required ? "*" : ""}
            </label>
            <div className={styles.radioGroup__inputs}>
                {list.map(
                    ({
                        label,
                        inputProps,
                    }: {
                        label: string;
                        inputProps: any;
                    }) => (
                        <Radio
                            label={label}
                            inputProps={{
                                ...inputProps,
                                name: groupName,
                                checked: inputProps.value === checked,
                                onChange,
                            }}
                            key={inputProps.id}
                        />
                    )
                )}
            </div>
        </div>
    );
}
