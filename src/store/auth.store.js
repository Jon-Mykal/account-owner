import axios from "axios";
import { AuthService } from "../services/auth.service";

const namespaced = true;
const authSvc = new AuthService();

const state = {
    user: null,
    isLoggedIn: false
}

const mutations =  {
    SET_USER(state, userData) {
        //state.user = user;
        localStorage.setItem('token', userData.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        state.isLoggedIn = !!localStorage.getItem('token')
    },
    CLEAR_USER() {
        location.reload();
    }
}

const actions = {
    registerUser({commit}, {route, userRegDto} ) {
        return authSvc.registerUser(route, userRegDto).then(res => {

        });
    },
    loginUser({commit}, {route, userAuthDto}) {
        //console.log(userAuthDto);
        return authSvc.loginUser(route, userAuthDto).then(res => {
            if (res.data.isSuccessful) {
                commit('SET_USER', res.data);
            }
            return res.data;
        });
    },
    logout({commit}) {
        localStorage.removeItem("token");
        commit('CLEAR_USER');
    },
    isLoggedIn({getters}) {
        return getters.isAuthenticated;
    }
}

const getters = {
    isAuthenticated(state) {
        state.isLoggedIn = !!localStorage.getItem('token');
        return state.isLoggedIn;
    }
}

const authStore = {
    namespaced,
    state,
    mutations,
    actions,
    getters
}

export default authStore;