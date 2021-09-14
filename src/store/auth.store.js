import axios from "axios";
import { AuthService } from "../services/auth.service";
import * as jwt from "jsonwebtoken"

const namespaced = true;
const authSvc = new AuthService();

const state = {
    user: {
        email: "",
        exp: Date.now(),
        sub: "",
        token: null
    },
    isLoggedIn: false
}

const mutations =  {
    LOGIN_USER(state, token) {
        state.user.token = token;
        const loginClaim = jwt.decode(token);
        claimToState(state, loginClaim);
        localStorage.setItem("token", token);
    },
    LOCAL_STORAGE_TOKEN_LOG_IN(state, token) {
        state.user.token = token;
        const loginClaim = jwt.decode(token);
        claimToState(state, loginClaim);
    },
    CLEAR_USER() {
        location.reload();
    }
}

const actions = {
    registerUser({commit}, {route, userRegDto} ) {
        return authSvc.registerUser(route, userRegDto).then(res => {
            return res.data;
        });
    },
    loginUser({commit}, {route, userAuthDto}) {
        //console.log(userAuthDto);
        return authSvc.loginUser(route, userAuthDto).then(res => {
            if (res.data.isSuccessful) {
                commit('LOGIN_USER', res.data.token);
            }
            return res.data;
        });
    },
    logout({commit}) {
        authSvc.logoutUser();
    },
    forgotPassword({commit}, {route, forgotPasswordDto}) {
        return authSvc.forgotPassword(route, forgotPasswordDto).then(res => {
            return res.data;
        });
    },
    resetPassword({commit}, {route, resetPasswordDto}) {
        return authSvc.resetPassword(route, resetPasswordDto).then(res => {
            return res.data;
        })
    },
    signInWithGoogle({commit}, route) {
        // return authSvc.signInWithGoogle().then(res => {
        //     return res;
        // });
        authSvc.signInWithGoogle((res) => {
            const responsePayload = jwt.decode(res.credential);
        
            const googleDTO = {
                provider: 'Google',
                token: res.credential
            }

            authSvc.externalLogin(route, googleDTO).then((rsp) => {
                if (rsp.data.isSuccessful) {
                    commit('LOGIN_USER', rsp.data.token);
                }
            });
         
        });
    },
    isLoggedIn({getters}) {
        return getters.isAuthenticated;
    }
}

const getters = {
    email: state => {
        return state.user.email;
    },
    isAuthenticated(state) {
        if (authSvc.isTokenValid()) {
            state.user.token = authSvc.getToken();
            console.log("Valid token");
        }
        return state.user.token;
    }
}

function claimToState(state, claim) {
    state.user.sub = claim.sub;
    state.user.email = claim.email;
    state.user.exp = claim.exp;
}

const authStore = {
    namespaced,
    state,
    mutations,
    actions,
    getters
}

export default authStore;