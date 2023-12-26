"use client";

import Button from "@components/button";
import Form, { FormItem } from "@components/form";
import Input from "@components/input";
import { FormEvent, useState } from "react";
import request from "utils/api";

/*
2.3
아래와 같은  서버 API 명세서가 주어졌을때 이를 이용하여 인증을 수행하고, 로컬 스토리지에 JWT 토큰을 저장하는 SPA를 작성하세요.
( 각 데이터는 실제 API 통신이 아니라, 규약에 맞는 mock data를 구성해서 테스트 가능하게 구현합니다.) 
*/

const FormList: FormItem<MemberAuthenticationReq>[] = [
    {
        key: "emailAddr",
        label: "이메일",
        type: "email",
        placeholder: "이메일을 입력해주세요.",
    },
    {
        key: "passCode",
        label: "비밀번호",
        type: "password",
        placeholder: "비밀번호를 입력해주세요.",
    },
];

const LOGIN_MSG_BOX = {
    fail: "ID 또는 비밀번호가 일치하지 않습니다.",
    success: "로그인에 성공하였습니다.",
};

const INIT_FORM_STATE: MemberAuthenticationReq = {
    userType: "U",
    emailAddr: "",
    passCode: "",
};

export default function JWTAuthentication() {
    const [formField, setFormField] =
        useState<MemberAuthenticationReq>(INIT_FORM_STATE);

    const handleChange = (
        key: keyof MemberAuthenticationReq,
        value: string,
    ) => {
        setFormField((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const { isLogin, token } = await request(
            "member/authentication",
            formField,
        );

        // 로그인 실패 처리
        if (isLogin !== "true" || !token) return alert(LOGIN_MSG_BOX.fail);

        // 로그인 성공 처리
        localStorage.setItem("token", token);
        alert(LOGIN_MSG_BOX.success);
    };

    return (
        <div className="w-mobile mx-auto py-5">
            <h1 className="font-bold text-xl mb-4">로그인</h1>
            <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {FormList.map(({ key, label, ...rest }) => (
                    <Form.Item key={key} label={label}>
                        <Input
                            {...rest}
                            value={formField[key]}
                            onChange={(ev) =>
                                handleChange(key, ev.target.value)
                            }
                        />
                    </Form.Item>
                ))}
                <Button type="submit" className="mt-4 ml-auto" intent="primary">
                    로그인
                </Button>
            </Form>
        </div>
    );
}
