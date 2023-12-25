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
    return name.length > 1 && name.length <= 20;
}

function isValidId(id: string): boolean {
    return id.includes("@") || id.includes("-");
}

export function hasError(id: keyof MemberEntity, value: string): boolean {
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
