import { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...props} />
        </div>
    );
};
