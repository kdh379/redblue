// msw에서 사용하기 위해 export
function isValidPassword(password: string): boolean {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        password,
    );

    return hasLowerCase && hasUpperCase && hasNumber && hasSpecialCharacter;
}

function isValidName(name: string): boolean {
    return name.length <= 20; // 20자 이하
}

function isValidId(id: string): boolean {
    const containsAtSymbol = id.includes("@"); // 이메일 형식
    const hasEnoughDigits = id.replace(/[^0-9]/g, "").length >= 10; // 휴대폰 형식

    return containsAtSymbol || hasEnoughDigits;
}

export function hasError(id: keyof MemberSignUpReq, value: string): boolean {
    switch (id) {
        case "id":
            return !isValidId(value);
        case "name":
            return !isValidName(value);
        case "password":
            return !isValidPassword(value);
        default:
            return false;
    }
}
