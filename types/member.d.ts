type MemberSignUpReq = {
    name: string;
    id: string;
    password: string;
    introduction: string;
};

type MemberSignUpRes = {
    isSignUp: boolean;
};
