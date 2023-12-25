import { HTMLAttributes, InputHTMLAttributes } from "react";

export interface FormItem extends InputHTMLAttributes<HTMLInputElement> {
    id: keyof MemberEntity;
    label: string;
    type: InputHTMLAttributes<HTMLInputElement>["type"];
}

export default function Form(props: HTMLAttributes<HTMLFormElement>) {
    const { children, ...rest } = props;
    return <form {...rest}>{children}</form>;
}

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    name: string;
    isRequired?: boolean;
}

function Item(props: ItemProps) {
    return (
        <div>
            <label htmlFor={props.name}>
                {props.label}
                {props.isRequired && <span className="text-red-500">*</span>}
            </label>
            {props.children}
        </div>
    );
}

Form.Item = Item;
