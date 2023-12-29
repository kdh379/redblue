import { HTMLAttributes, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export default function Textarea(props: TextareaProps) {
    const { className, ...rest } = props;

    return <textarea className={`textarea ${className}`} {...rest}></textarea>;
}
