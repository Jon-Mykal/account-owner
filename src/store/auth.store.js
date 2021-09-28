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
        token: null,
        refreshToken: null
    },
    isLoggedIn: false
}

const mutations =  {
    LOGIN_USER(state, userData) {
        state.user.token = userData.token;
        state.user.refreshToken = userData.refreshToken;
        const loginClaim = jwt.decode(userData.token);
        claimToState(state, loginClaim);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("refreshToken", userData.refreshToken)
    },
    LOCAL_STORAGE_TOKEN_LOG_IN(state, token) {
        state.user.token = token;
        const loginClaim = jwt.decode(token);
        claimToState(state, loginClaim);
    },
    CLEAR_USER() {
        location.reload();
    },
    REFRESH_USER(state, tokenData) {
        state.user.token = tokenData.token;
        state.user.refreshToken = tokenData.refreshToken;
        const loginClaim = jwt.decode(tokenData.token);
        claimToState(state, loginClaim);
        localStorage.setItem("token", tokenData.token);
        localStorage.setItem("refreshToken", tokenData.refreshToken)
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
                commit('LOGIN_USER', res.data);
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
    },
    tryTokenRefresh({commit}) {
        try {
            let refreshToken = authSvc.getRefreshToken();

            if (refreshToken) {
                let tokenDto = {
                    accessToken: authSvc.getToken(),
                    refreshToken
                }
                
                return authSvc.refreshToken('refresh', tokenDto).then((res) => {
                    console.log("Hit here");
                    commit('REFRESH_USER', res.data);
                    return true;
                }).catch(err => {
                    console.log(err);
                    if (err.response) {
                        // Logout user
                        authSvc.logoutUser();
                    }
                    else {
                        return false;
                    }
                });

            }
        } catch (error) {
            console.log(`Something went wrong in tryRefreshToken(): ${error}`);
            return false;
        }

    }
}

const getters = {
    email: state => {
        return state.user.email;
    },
    isAuthenticated(state) {
        if (authSvc.isTokenValid()) {
            state.user.token = authSvc.getToken();
            //console.log("Valid token");
        }
        state.user.refreshToken = authSvc.getRefreshToken();
        return state.user.token || state.user.refreshToken;
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