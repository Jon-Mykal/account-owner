export class RegistrationResponseDto {
    _isSuccessful;
    _errors;

    constructor(isSuccessful, errors) {
        this._isSuccessful = isSuccessful;
        this._errors = errors;
    }

    get isSuccessful() {
        return this._isSuccessful;
    }

    get errors() {
        return this._errors;
    }
}



