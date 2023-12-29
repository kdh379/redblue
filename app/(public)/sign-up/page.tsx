"use client";

import Button from "@components/button";
import Form, { FormItem } from "@components/form";
import Input from "@components/input";
import Textarea from "@components/textarea";
import { useState } from "react";
import request from "utils/api";
import { hasError } from "utils/password-valid";

/*
2.2. 회원가입 모듈을 만들려고 합니다. 아래 Props를 갖는 객체를 선언하고, 각 항목은 Form형태로 받아서
Validation을 수행하는 예제를 구성하세요. Next JS를 쓰셔도 됩니다.
서버 API는 있다고 가정하고 Mock Data로 선언해서 통신해 주세요. 

-- 회원명 : not null, text max 20자
-- 이메일 주소 또는 폰번호 : not null, text 형태로 이메일 형식, 휴대폰번호 형태인지 검증
-- 비밀번호 : not null, 8자 이상, 영소문자/대문자, 숫자, 특수문자 조합 
-- 자기소개 : nullable, textarea 형태로 3줄 max 512자 이내

*/

const FORM_LIST: FormItem<MemberSignUpReq>[] = [
    {
        key: "name",
        type: "text",
        label: "회원명",
        placeholder: "이름을 입력해주세요.",
        maxLength: 20,
    },
    {
        key: "id",
        type: "text",
        label: "아이디",
        placeholder: "휴대폰 또는 이메일",
    },
    {
        key: "password",
        label: "패스워드",
        placeholder: "영문, 숫자, 특수문자 포함 8자 이상",
        type: "password",
        minLength: 8,
    },
];

const INTRODUCTION_ROWS = 3;
const INTRODUCTION_MAX_LENGTH = 512;

const MSG_BOX = {
    error: "입력값을 확인해주세요.",
    success: "회원가입이 완료되었습니다.",
};

const INIT_FORM_STATE: MemberSignUpReq = {
    name: "",
    id: "",
    password: "",
    introduction: "",
};

export default function SignUpPage() {
    const [formFields, setFormFields] =
        useState<MemberSignUpReq>(INIT_FORM_STATE);

    const handleFormFieldsChange = (
        key: keyof MemberSignUpReq,
        value: string,
    ) => {
        setFormFields((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // validation
        const isInvalid = FORM_LIST.some(({ key }) => {
            return hasError(key, formFields[key]);
        });
        if (isInvalid) return alert(MSG_BOX.error);

        const res = await request("member/sign-up", formFields);

        if (res.isSignUp) alert(MSG_BOX.success);
    };

    return (
        <div className="py-8 max-w-mobile mx-auto px-4">
            <h1 className="mb-4 font-bold text-lg">회원가입</h1>
            <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {FORM_LIST.map(({ key, label, ...rest }) => (
                    <Form.Item key={key} label={label} isRequired={true}>
                        <Input
                            value={formFields[key]}
                            required
                            onRule={() => hasError(key, formFields[key])}
                            onChange={(ev) =>
                                handleFormFieldsChange(key, ev.target.value)
                            }
                            {...rest}
                        />
                    </Form.Item>
                ))}
                <Form.Item label="자기소개" key="introduction">
                    <Textarea
                        rows={INTRODUCTION_ROWS}
                        maxLength={INTRODUCTION_MAX_LENGTH}
                        onChange={(ev) =>
                            handleFormFieldsChange(
                                "introduction",
                                ev.target.value,
                            )
                        }
                    ></Textarea>
                </Form.Item>
                <Button type="submit" className="mt-4" intent="primary">
                    회원가입
                </Button>
            </Form>
        </div>
    );
}
