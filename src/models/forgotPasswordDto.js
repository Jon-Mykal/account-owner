export class ForgotPasswordDto {
    constructor(email = "", clientURI = "") {
        this.email = email;
        this.clientURI = clientURI;
    }
}