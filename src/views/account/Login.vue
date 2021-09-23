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
            <section class="form-wrapper col-md-7 col-sm-9 col-12 col-lg-5 mt-5 shadow">
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Login</h1>
                <form @submit.prevent="loginUser(meta.valid)" class="form-horizontal px-4 mx-2">
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="email" @blur="email.meta.touched = true" :class="{ 'p-invalid': (!email.meta.valid && email.meta.dirty) && email.meta.touched }" class="w-100" type="text" v-model="email.value"/>
                        <label for="email" :class="{ 'p-error': (!email.meta.valid && email.meta.dirty) && email.meta.touched }">Email</label>
                    </span>
                    <small v-if="((!email.meta.valid && email.meta.dirty) && email.meta.touched) && formSubmitted" class="p-error">{{email.errorMessage}}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <Password id="password" :class="{ 'p-invalid': password.errorMessage && formSubmitted }" class="w-100" inputClass="w-100" v-model="password.value" toggleMask></Password>
                        <label :class="{ 'p-error': password.errorMessage && formSubmitted }" for="password">Password</label>
                    </span>
                    <small v-if="password.errorMessage && formSubmitted" class="p-error">{{password.errorMessage}}</small>
                    <section class="p-field pt-1 d-flex">
                        <span class="p-field fst-italic pt-1">
                            <router-link :to="{ name: 'ForgotPassword'}">Forgot Password</router-link>
                        </span>
                    </section>
                    <!-- <small v-if="(v$.dateOfBirth.$invalid && formSubmitted) || v$.dateOfBirth.$pending.$response" class="p-error">{{ v$.dateOfBirth.required.$message.replace('Value', 'Date of birth')}}</small> -->
                </section>
                <section class="d-flex flex-column mb-5">
                    <Button type="submit" label="Login" class="btn btn-primary mb-2" :disabled="!meta.valid || isSubmitting" :loading="isSubmitting" />
                    <Divider align="center">
                        <strong>Or</strong>
                    </Divider>
                    <Button id="g-button" label="Sign in with Google" class="btn btn-primary mb-2" @click="signInWithGoogle()"/>
                    <Button id="fb-button" label="Continue with Facebook" class="btn btn-primary" @click="formSubmitted = !formSubmitted">
                        <font-awesome-icon :icon="['fab','facebook']" />
                        Facebook
                    </Button>
                    <section class="p-field pt-3">
                        <p class="text-center">
                            Don't have an account? <router-link :to="{name: 'Register'}"><strong>Sign Up</strong></router-link>
                        </p>
                    </section>
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
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const storeName = "authStore";
        const store = useStore();
        let returnUrl = route.query["returnUrl"] || '/';

            // Define validation schema
            const valSchema = yup.object({
                email: yup.string().required().email().label('Email'),
                password: yup.string().required().label('Password')
            });

            const { meta } = useForm({
                validationSchema: valSchema
            });

            const fieldsToValidate = reactive({
                email: useField('email'),
                password: useField('password')
            });

        google.accounts.id.initialize({
            client_id: '854809495249-5ot1f698ginq2k2g9lsc2b2o6hnnpjas.apps.googleusercontent.com',
            ux_mode: 'popup',
            login_uri: 'http://localhost',
            //callback: fn,
            auto_select: false  
        });

        const state = reactive({
            user: new UserAuthDto(),
            formSubmitted: false,
            isSubmitting: false,
            showPopup: false,
            loginUser(isFormValid) {
                this.formSubmitted = true;
                if (!isFormValid) {
                    return;
                }

                this.isSubmitting = true;
                this.user.clientURI = 'http://localhost:8080/account/forgotpassword'
                store.dispatch(`${storeName}/loginUser`, {route: 'login', userAuthDto: this.user}).then(res => {
                    this.isSubmitting = false;
                    console.log(returnUrl);
                    router.push(returnUrl);
                }).catch(err => {
                    this.isSubmitting = false;
                    console.log(err);
                });
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
        return {...toRefs(state), ...toRefs(fieldsToValidate), meta}
    }
}
</script>

<style scoped>
#fb-button {
    background-color: #4267B2;
}
</style>