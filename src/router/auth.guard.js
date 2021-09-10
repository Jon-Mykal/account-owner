import store  from "../store/index";

const storeName = 'authStore';
export const authGuard = (to, from, next) => {
    // Get all routes requiring auth.
    const authRequired = to.matched.some((record) => record.meta.requiresAuth);
    console.log(authRequired);
    if (authRequired) {
        if (store.getters[`${storeName}/isAuthenticated`]) {
            next();
            return;
        }
        next({
            path: '/account/login',
            query: { returnUrl: to.fullPath }
        });
    }
    else {
        next();
    }
    
};
