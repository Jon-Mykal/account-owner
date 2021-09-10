import api from './apiClient'
import * as jwt from 'jsonwebtoken'

const RESOURCE_NAME = '/account';
const config = { timeout: 5000 }

export class AuthService {
    constructor() {

    }

    registerUser(route, userRegDto) {
        const completeRoute = `${RESOURCE_NAME}/${route}`;

        return api.post(completeRoute, userRegDto);
    }

    loginUser(route, userAuthDto) {
        const completeRoute = `${RESOURCE_NAME}/${route}`;
        return api.post(completeRoute, userAuthDto);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    logoutUser() {
        localStorage.clear();
        location.reload();
    }

    isTokenValid() {
        let isValid = false;
        try {
            const token = this.getToken();
            if (!token) {
                return isValid;
            }

            const decoded = jwt.decode(token);
            const expiresAt = decoded.exp * 1000;
            const dateNow = Date.now();

            isValid = dateNow <= expiresAt;

            return isValid;
        } catch (error) {
            console.log(`Something went wrong with AuthService.isTokenValid(): ${error}`);
        }

        return isValid;
    }


}