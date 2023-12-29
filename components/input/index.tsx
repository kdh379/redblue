"use client";

import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean;
    onRule?: (value: InputHTMLAttributes<HTMLInputElement>["value"]) => boolean;
}

export default function Input(props: InputProps) {
    const {
        className,
        value,
        required,
        placeholder,
        isError,
        onRule,
        ...rest
    } = props;

    const [isRequiredError, setIsRequiredError] = useState(false);

    // required 규칙에 맞지 않으면, 에러 표시
    const handleBlur = () => {
        if (required && (!value || onRule?.(value))) setIsRequiredError(true);
        else setIsRequiredError(false);
    };

    return (
        <input
            className={clsx("input", className, {
                "input--error": isRequiredError || isError,
            })}
            value={value}
            required={required}
            placeholder={placeholder}
            onBlur={handleBlur}
            {...rest}
        ></input>
    );
}
