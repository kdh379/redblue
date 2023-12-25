import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    intent?: Intent;
}

declare type Intent = "primary";

export default function Button(props: PropsWithChildren<ButtonProps>) {
    const { className, intent, ...rest } = props;

    return (
        <button
            className={`button ${intent && `button__${intent}`} ${className}`}
            {...rest}
        >
            {props.children}
        </button>
    );
}
