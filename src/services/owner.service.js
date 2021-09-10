import api from './apiClient'

const RESOURCE_NAME = '/owners';
const config = { timeout: 5000 }

const OwnerService = {
    getAll() {
        return api.get(RESOURCE_NAME, config);
    },

    get(id){
        return api.get(`${RESOURCE_NAME}/${id}`, config);
    },

    getAccounts(id) {
        return api.get(`${RESOURCE_NAME}/${id}/accounts`, config)
    },

    create(data) {
        return api.post(RESOURCE_NAME, data, config);
    },

    update(id, data) {
        return api.put(`${RESOURCE_NAME}/${id}`, data, config);
    },

    delete(id) {
        return api.delete(`${RESOURCE_NAME}/${id}`, config);
    }
}

export default OwnerService;