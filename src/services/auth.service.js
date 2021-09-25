import api from './apiClient'
import * as jwt from 'jsonwebtoken'
import UniversalSocialauth, { Google, Providers } from 'universal-social-auth';
import { getCurrentInstance } from 'vue'
import GAuth from 'vue3-google-oauth2';


const RESOURCE_NAME = '/account';
const config = { timeout: 15000 }

// Auth Options
const authOptions = {
    google: {
        clientId: "854809495249-5ot1f698ginq2k2g9lsc2b2o6hnnpjas.apps.googleusercontent.com",
        redirectUri: "https://localhost:44331/signin-google"
    }
};


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

    forgotPassword(route, forgotPasswordDto) {
        const completeRoute = `${RESOURCE_NAME}/${route}`;
        return api.post(completeRoute, forgotPasswordDto);
    }

    resetPassword(route, resetPasswordDto) {
        const completeRoute = `${RESOURCE_NAME}/${route}`;
        return api.post(completeRoute, resetPasswordDto);
    }

    signInWithGoogle(fn) {
        const data = google.accounts.id.initialize({
            client_id: '854809495249-5ot1f698ginq2k2g9lsc2b2o6hnnpjas.apps.googleusercontent.com',
            ux_mode: 'popup',
            login_uri: 'http://localhost',
            //callback: fn,
            auto_select: false  
        });

        console.log(data);
        // google.accounts.id.prompt((notification) => {
        //     console.log(notification);
        // });
        
    }

    externalLogin(route, externalAuthDto) {
        const completeRoute = `${RESOURCE_NAME}/${route}`;
        return api.post(completeRoute, externalAuthDto);
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