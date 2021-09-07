import axios from 'axios'

const RESOURCE_NAME = '/account';
const config = { timeout: 5000 }

export class AuthService {
    constructor() {

    }

    registerUser(route, userRegDto) {
        const completeRoute = `${RESOURCE_NAME}/${route}`;

        return axios.post(completeRoute, userRegDto);
    }


}