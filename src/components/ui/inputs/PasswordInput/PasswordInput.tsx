import { FC, useState } from "react";
import styles from "./PasswordInput.module.css";
import eyeOpen from "@assets/img/icons/eye-open.svg";
import eyeClosed from "@assets/img/icons/eye-closed.svg";

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    minLength?: number;
}

export const PasswordInput: FC<PasswordInputProps> = ({ 
    value, 
    onChange, 
    required,
    minLength 
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.passwordInput}>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    minLength={minLength}
                />
                <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <img
                        src={showPassword ? eyeOpen : eyeClosed}
                        alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    />
                </button>
            </div>
        </div>
    );
};
