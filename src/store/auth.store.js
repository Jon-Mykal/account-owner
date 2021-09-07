import { AuthService } from "../services/auth.service";

const namespaced = true;
const authSvc = new AuthService();

const state = {
    user: {}
}

const mutations =  {
    SET_USER(state, user) {
        state.user = user;
    }
}

const actions = {
    registerUser({commit}, {route, userRegDto} ) {
        return authSvc.registerUser(route, userRegDto);
    }
}

const getters = {

}

const authStore = {
    namespaced,
    state,
    mutations,
    actions,
    getters
}

export default authStore;