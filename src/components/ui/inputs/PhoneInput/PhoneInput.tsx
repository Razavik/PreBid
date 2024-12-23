import { FC, ChangeEvent } from "react";
import { Input } from "../Input/Input";

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export const PhoneInput: FC<PhoneInputProps> = ({ value, onChange, required }) => {
    const formatPhoneNumber = (value: string) => {
        // Убираем все нецифровые символы
        const numbers = value.replace(/[^\d]/g, "");

        // Если номер пустой, возвращаем базовый префикс
        if (numbers.length <= 3) return "+375";

        // Получаем код оператора (следующие 2 цифры после 375)
        const operatorCode = numbers.slice(3, 5);

        // Базовая часть номера с кодом оператора
        let formatted = `+375 ${operatorCode}`;

        // Получаем оставшиеся цифры
        const restNumbersFirst = numbers.slice(5, 8);
        const restNumbersSecond = numbers.slice(8, 10);
        const restNumbersLast = numbers.slice(10, 12);

        if (operatorCode.length > 0 && operatorCode.length < 3) {
            formatted = `+375 (${operatorCode}`;
            if (restNumbersFirst.length > 0) {
                formatted += `) ${restNumbersFirst}`;

                if (restNumbersSecond.length > 0) {
                    formatted += ` ${restNumbersSecond}`;

                    if (restNumbersLast.length > 0) {
                        formatted += ` ${restNumbersLast}`;
                    }
                }
            }
        }

        return formatted.trim();
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        // Если пытаемся стереть +375, то не обрабатываем изменение
        if (value.length < 4) {
            return;
        }

        // Форматируем номер
        const formattedNumber = formatPhoneNumber(value);

        // Ограничиваем длину номера
        if (formattedNumber.length <= 21) {
            onChange(formattedNumber);
        }
    };

    return (
        <Input
            type="tel"
            id="phone"
            name="phone"
            label="Номер телефона"
            value={value}
            onChange={handlePhoneChange}
            required={required}
            placeholder="+375"
        />
    );
};
