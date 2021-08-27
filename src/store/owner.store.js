import OwnerService from "../services/owner.service";

const namespaced = true;

const state = {
    owner: {},
    owners: []
}

const mutations = {
    SET_OWNER(state, owner) {
        state.owner = owner;
    },
    SET_OWNERS(state, owners) {
        state.owners = owners;
    },
    CLEAR_OWNER(state) {
        state.owner = {};
    },
    CLEAR_OWNERS(state) {
        state.owners = [];
    }

}

const actions = {
    addOwner({commit}, owner) {
        return OwnerService.create(owner).then((res) => {
            commit('SET_OWNER', owner);
        });
    },
    getOwners({commit}) {
        return OwnerService.getAll().then((res) => {
            commit('SET_OWNERS', res.data);
            return res.data;
        });
    },
    getOwner({commit}, id) {
        return OwnerService.get(id).then((res) => {
            commit('SET_OWNER', res.data);
            return res.data;
        });
    },
    deleteOwner({commit, state}, id) {
        return OwnerService.delete(id).then((res) => {
            console.log(res);
            state.owners = state.owners.filter(x => x.Id != id);
            commit('CLEAR_OWNER');
            commit('SET_OWNERS', state.owners);
        });
    }
}

const ownerStore = {
    namespaced,
    state,
    mutations,
    actions
};

export default ownerStore;