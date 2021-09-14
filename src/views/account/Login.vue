<template>
    <div>
        <Dialog header="Status" v-model:visible="showPopup" :modal="true">
            <p :innerHTML="statusMessage">

            </p>
            <template #footer>
                <Button label="Ok" @click="closePopup()"/>
            </template>
        </Dialog>
        <section class="d-flex justify-content-center">
            <section class="form-wrapper w-25 mt-5 shadow">
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Login</h1>
                <form @submit.prevent="loginUser()" class="form-horizontal">
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="email" :class="{ 'p-invalid': false}" class="w-100" type="text" v-model="user.email"/>
                        <label for="email" :class="{ 'p-error': false}">Email</label>
                    </span>
                    <!-- <small v-if="(v$.name.$invalid && formSubmitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Owner\'s Name')}}</small> -->
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <Password id="password" :class="{ 'p-invalid': false}" class="w-100" inputClass="w-100" v-model="user.password" toggleMask></Password>
                        <label :class="{ 'p-error': false}" for="password">Password</label>
                    </span>
                    <section class="p-field pt-1 d-flex">
                        <span class="p-field fst-italic pt-1">
                            <router-link :to="{ name: 'ForgotPassword'}">Forgot Password</router-link>
                        </span>
                    </section>
                    <!-- <small v-if="(v$.dateOfBirth.$invalid && formSubmitted) || v$.dateOfBirth.$pending.$response" class="p-error">{{ v$.dateOfBirth.required.$message.replace('Value', 'Date of birth')}}</small> -->
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <section class="p-field pt-2">
                        <p class="text-center">
                            Don't have an account? <router-link :to="{name: 'Register'}">Sign Up</router-link>
                        </p>
                    </section>
                    <Button type="submit" label="Login" class="btn btn-primary mb-2" />
                    <Divider align="center">
                        <strong>Or</strong>
                    </Divider>
                    <Button label="Sign in with Google" class="btn btn-primary" @click="signInWithGoogle()"/>
                </section>
                </form>
            </section>
        </section>
        <!-- <section class="pt-2">
            <Button label="Sign in with Google" @click="signInWithGoogle()"/>
        </section> -->
    </div>
</template>

<script>
import { reactive, toRefs, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { UserAuthDto } from '../../models/userAuthDto'
import { useStore } from 'vuex';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const storeName = "authStore";
        const store = useStore();
        let returnUrl = route.query["returnUrl"] || '/';
        
const gAuth = inject('googleAuth');
        const state = reactive({
            user: new UserAuthDto(),
            showPopup: false,
            loginUser() {
                
                store.dispatch(`${storeName}/loginUser`, {route: 'login', userAuthDto: this.user}).then(res => {
                    console.log(returnUrl);
                    router.push(returnUrl);
                }).catch(err => {
                    console.log(err);
                })
            },
            goBack() {
                router.back();
            },
            closePopup() {

            },
            signInWithGoogle() {
                store.dispatch(`${storeName}/signInWithGoogle`, 'externallogin');
                google.accounts.id.prompt((notification) => {   
                    console.log('notification', notification);
                    if (notification.isDisplayMoment()) {
                        console.log('Display moment occurring');
                    }

                    if (notification.isSkippedMoment()) {
                        console.log(`Notification skipped because: ${notification.getSkippedReason()}`);
                    }

                    if (notification.isDismissedMoment()) {
                        console.log(`Notification dismissed because: ${notification.getDismissedReason()}`);
                    }

                    if (notification.isDisplayed()) {
                        console.log("UI displayed");
                    }
                    else if (notification.isNotDisplayed()) {
                        console.log(`UI not displayed because: ${notification.getNotDisplayedReason()}`);
                    }

                });
                
                //console.log(gAuth);
            }
        });
        return {...toRefs(state)}
    }
}
</script>

<style scoped>

</style>