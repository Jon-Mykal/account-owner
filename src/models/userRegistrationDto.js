export class UserRegistrationDto {
    firstName;
    lastName;
    email;
    password;
    confirmPassword;

    constructor(firstName = "", lastName = "", email = "", password = "", confirmPassword = "") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password= password;
        this.confirmPassword = confirmPassword;
    }

    /*
    get firstName() {
        return this.firstName;
    }
    
    get lastName() {
        return this.lastName;
    }

    get email() {
        return this.email;
    }

    get password() {
        return this.password;
    }

    get confirmPassword() {
        return this.confirmPassword;
    }
    */
}