import { AuthService } from "./auth.service";

const authSvc = new AuthService();

export const interceptorsInit = (axiosInstance)  => {
    axiosInstance.interceptors.request.use((options) => {
        const jwtToken = authSvc.getToken();

        if (jwtToken) {
            options.headers["Authorization"] = `Bearer ${jwtToken}`;
        }

        return options;
    });

    return axiosInstance;
} 
