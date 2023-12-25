interface HttpReqRes<T_Req, T_Res> {
    req: T_Req;
    res: T_Res;
}

type APIInfo = {
    url: string;
    method: "POST";
};

interface APIInterface {
    "member/sign-up": HttpReqRes<MemberSignUpReq, MemberSignUpRes>;
    "member/authentication": HttpReqRes<
        MemberAuthenticationReq,
        MemberAuthenticationRes
    >;
}

const URLDict: Record<keyof APIInterface, APIInfo> = {
    "member/sign-up": {
        url: "/api/sign-up",
        method: "POST",
    },
    "member/authentication": {
        url: "/api/authentication",
        method: "POST",
    },
};

export default async function request<T extends keyof APIInterface>(
    api: T,
    req: APIInterface[T]["req"],
): Promise<APIInterface[T]["res"]> {
    const { url, method } = URLDict[api];

    const res = await fetch(url, {
        method,
        body: JSON.stringify(req),
    });

    return res.json();
}
