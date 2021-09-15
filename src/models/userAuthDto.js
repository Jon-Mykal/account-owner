export class UserAuthDto {
    constructor(email = "", password = "", clientURI = "") {
        this.email = email;
        this.password = password;
        this.clientURI = clientURI;
    }
}