import { HttpResponse, http, passthrough } from "msw";
import { hasError } from "utils/password-valid";

export const handlers = [
    http.post<any, MemberSignUpReq, MemberSignUpRes>(
        "/api/sign-up",
        async ({ request }) => {
            const form = await request.json();

            let errors = false;

            Object.entries(form).forEach(([key, value]) => {
                errors = hasError(key as keyof MemberSignUpReq, value);
            });

            if (errors) {
                return HttpResponse.json(
                    {
                        isSignUp: false,
                    },
                    {
                        status: 400,
                    },
                );
            }

            return HttpResponse.json({
                isSignUp: true,
            });
        },
    ),
    http.post<any, MemberAuthenticationReq, MemberAuthenticationRes>(
        "api/authentication",
        async ({ request }) => {
            // TODO API 처리...
            const { emailAddr, passCode, userType } = await request.json();

            return HttpResponse.json({
                isLogin: "true",
                token: "eyJhbxxxxxxx",
            });
        },
    ),
    http.all("*", passthrough),
];
