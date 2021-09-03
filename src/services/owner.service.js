import axios from 'axios'

const RESOURCE_NAME = '/owners';
const config = { timeout: 5000 }

const OwnerService = {
    getAll() {
        return axios.get(RESOURCE_NAME, config);
    },

    get(id){
        return axios.get(`${RESOURCE_NAME}/${id}`, config);
    },

    getAccounts(id) {
        return axios.get(`${RESOURCE_NAME}/${id}/accounts`, config)
    },

    create(data) {
        return axios.post(RESOURCE_NAME, data, config);
    },

    update(id, data) {
        return axios.put(`${RESOURCE_NAME}/${id}`, data, config);
    },

    delete(id) {
        return axios.delete(`${RESOURCE_NAME}/${id}`, config);
    }
}

export default OwnerService;