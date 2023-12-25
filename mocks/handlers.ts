import { HttpResponse, http, passthrough } from "msw";
import { hasError } from "utils/password-valid";

export const handlers = [
    http.post<any, MemberEntity>("/api/sign-up", async ({ request }) => {
        const form = await request.json();

        let errors = false;

        Object.entries(form).forEach(([key, value]) => {
            errors = hasError(key as keyof MemberEntity, value);
        });

        if (errors) {
            return new HttpResponse(null, {
                status: 400,
                statusText: "Bad Request",
            });
        }

        return new HttpResponse(null, {
            status: 200,
            statusText: "OK",
        });
    }),
    http.all("*", passthrough),
];
