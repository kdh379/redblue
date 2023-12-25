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
    // 이메일 형식
    const containsAtSymbol = id.includes("@");
    // 휴대폰 번호 형식
    const hasEnoughDigits = id.replace(/\D]/g, "").length >= 10;
    const phonePattern = /^(01[016789])[-]?\d{3,4}[-]?\d{4}$/.test(id);

    return containsAtSymbol || (hasEnoughDigits && phonePattern);
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
