import store  from "../store/index";
import { AuthService } from "../services/auth.service";

const authSvc = new AuthService();
const storeName = 'authStore';
export const authGuard = async (to, from, next) => {
    // Get all routes requiring auth.
    const authRequired = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = store.getters[`${storeName}/isAuthenticated`];
    // Always attempt to send the refresh.
    
    console.log(authRequired);
    if (authRequired && isAuthenticated) {
            await store.dispatch(`${storeName}/tryTokenRefresh`);
            next();
            return;
    }
    else if (authRequired && !isAuthenticated) {
        // Force login
        next({
            path: '/account/login',
            query: { returnUrl: to.fullPath }
        });
        return;
    }
    else if (!authRequired && isAuthenticated) {
        // Continue to refresh as long as user is logged in
        await store.dispatch(`${storeName}/tryTokenRefresh`);
        next();
        return;
    }
    else {
        // Don't attempt refresh
        next();
    }
    
};
