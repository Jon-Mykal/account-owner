export class UserRegistrationDto {
    constructor(firstName, lastName, email, password, confirmPassword) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password= password;
        this._confirmPassword = confirmPassword;
    }

    get firstName() {
        return this._firstName;
    }
    
    get lastName() {
        return this._lastName;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this.password;
    }

    get confirmPassword() {
        return this._confirmPassword;
    }
}