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
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Register</h1>
                <form @submit.prevent="registerUser()" class="form-horizontal px-md-4 mx-2">
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="firstName" @blur="firstName.meta.touched = true" 
                        :class="{ 'p-invalid': !firstName.meta.valid && formSubmitted}" 
                        class="w-100" type="text" 
                        v-model="newUser.firstName"
                        @input="firstName.value = newUser.firstName"
                        />
                        <label for="firstName" :class="{ 'p-error': !firstName.meta.valid && formSubmitted }">First Name</label>
                    </span>
                    <small v-if="!firstName.meta.valid && formSubmitted" class="p-error">{{ firstName.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="lastName" @blur="lastName.meta.touched = true"
                        @input="lastName.value = newUser.lastName"
                         :class="{ 'p-invalid': !lastName.meta.valid && formSubmitted}" class="w-100" type="text" v-model="newUser.lastName"/>
                        <label for="lastName" :class="{ 'p-error': !lastName.meta.valid && formSubmitted}">Last Name</label>
                    </span>
                    <small v-if="!lastName.meta.valid && formSubmitted" class="p-error">{{ lastName.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="email" 
                        :class="{ 'p-invalid': !email.meta.valid && formSubmitted}" 
                        @input="email.value = newUser.email"
                        class="w-100" type="text" v-model="newUser.email"/>
                        <label for="email" :class="{ 'p-error': !email.meta.valid && formSubmitted}">Email</label>
                    </span>
                    <small v-if="!email.meta.valid && formSubmitted" class="p-error">{{ email.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <Password id="password" 
                        :class="{ 'p-invalid': !password.meta.valid && formSubmitted}" 
                        @input="password.value = newUser.password"
                        class="w-100" inputClass="w-100" v-model="newUser.password" toggleMask></Password>
                        <label :class="{ 'p-error': !password.meta.valid && formSubmitted}" for="password">Password</label>
                    </span>
                    <small v-if="!password.meta.valid && formSubmitted" class="p-error">{{ password.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <Password id="confirmPassword" 
                        :class="{ 'p-invalid': !confirmPassword.meta.valid && formSubmitted }" 
                        @input="confirmPassword.value = newUser.confirmPassword"
                        class="w-100" inputClass="w-100" v-model="newUser.confirmPassword" toggleMask></Password>
                        <label for="confirmPassword" :class="{ 'p-error': !confirmPassword.meta.valid && formSubmitted }">Confirm Password</label>
                    </span>
                    <small v-if="!confirmPassword.meta.valid && formSubmitted " class="p-error">{{ confirmPassword.errorMessage }}</small>
                </section>
                <section class="d-flex flex-column mb-5">
                    <Button type="submit" label="Register" class="btn btn-primary mb-2" :loading="isSubmitting" :disabled="!formConfig.meta.value.valid"  />
                    <section class="p-field pt-2">
                        <p class="text-center">
                            Already have an account? <router-link :to="{name: 'Login'}"><strong>Log In</strong></router-link>
                        </p>
                    </section>
                </section>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { UserRegistrationDto } from '../../models/userRegistrationDto'
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
export default {
    name: 'Register',
    setup () {
        try {
            const route = useRoute();
            const router = useRouter();
            const storeName = 'authStore';
            const store = useStore();

            // Define validation schema
            const valSchema = yup.object({
                firstName: yup.string().required().label('First name'),
                lastName: yup.string().required().label('Last name'),
                email: yup.string().required().email().label('Email'),
                password: yup.string().required().label('Password'),
                confirmPassword: yup.string()
                .oneOf([yup.ref('password'), null], "Passwords don't match!")
                .required().label('Confirm Password')
            });

            const formConfig = useForm({
                validationSchema: valSchema
            });

            const fieldsToValidate = reactive({
                firstName: useField('firstName'),
                lastName: useField('lastName'),
                email: useField('email'),
                password: useField('password'),
                confirmPassword: useField('confirmPassword')
            });

            const state = reactive({
                showPopup: false,
                formSubmitted: false,
                isSubmitting: false,
                statusMessage: "",
                newUser: new UserRegistrationDto(),
                goBack() {
                    router.back();
                },
                closePopup() {

                },
                async registerUser() {
                    this.formSubmitted = true;
                    formConfig.setValues(this.newUser);

                    await formConfig.validate();
                    const isFormValid = formConfig.meta.value.valid;
                    console.log(isFormValid);
                    if (!isFormValid) {
                        return;
                    }
                    
                    try {
                        this.isSubmitting = true;
                        store.dispatch(`${storeName}/registerUser`, { route: 'register', userRegDto: this.newUser}).then((res) => {
                            this.isSubmitting = false;
                        }).catch(err => {
                            this.isSubmitting = false;
                        });

                    } catch (error) {
                        console.log(`Something went wrong: ${error}`);
                    }

                }
            });
            
            return {...toRefs(state), ...toRefs(fieldsToValidate), formConfig}
        } catch (error) {
            console.log(`Something went wrong with setup(): ${error}`);
        }

        return { }
        
    }
}
</script>

<style scoped>

</style>