import { NextRequest } from "next/server";

const USER: MemberAuthenticationReq = {
    userType: "U",
    emailAddr: "kate@afoter.com",
    passCode: "test123456!",
};

const RES_TEMP: MemberAuthenticationRes = {
    isLogin: "true",
    token: "eyJhbxxxxxxx",
};

export async function POST(req: NextRequest) {
    const { emailAddr, passCode, userType }: MemberAuthenticationReq =
        await req.json();

    // USER 정보와 일치하는지 확인
    if (
        emailAddr !== USER.emailAddr ||
        passCode !== USER.passCode ||
        userType !== USER.userType
    ) {
        return new Response(
            JSON.stringify({
                isLogin: "false",
            }),
            {
                status: 400,
            },
        );
    }

    return new Response(JSON.stringify(RES_TEMP));
}
