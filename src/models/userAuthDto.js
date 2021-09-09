export class UserAuthDto {
    email;
    password;

    constructor(email = "", password = "") {
        this.email = email;
        this.password = password;
    }
}