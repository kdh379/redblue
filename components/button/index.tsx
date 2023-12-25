import clsx from "clsx";
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
            className={clsx("button", className, {
                [`button__${intent}`]: intent,
            })}
            {...rest}
        >
            {props.children}
        </button>
    );
}
