interface MemberAuthenticationReq {
    userType: string;
    emailAddr: string;
    passCode: string;
}

interface MemberAuthenticationRes {
    isLogin: string;
    token: string;
}
