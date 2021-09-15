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
            <section class="form-wrapper w-35 mt-5 shadow">
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Register</h1>
                <form @submit.prevent="registerUser()" class="form-horizontal px-4 mx-2">
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="firstName" :class="{ 'p-invalid': false}" class="w-100" type="text" v-model="newUser.firstName"/>
                        <label for="firstName" :class="{ 'p-error': false}">First Name</label>
                    </span>
                    <!-- <small v-if="(v$.name.$invalid && formSubmitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Owner\'s Name')}}</small> -->
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="lastName" :class="{ 'p-invalid': false}" class="w-100" type="text" v-model="newUser.lastName"/>
                        <label for="lastName" :class="{ 'p-error': false}">Last Name</label>
                    </span>
                    <!-- <small v-if="(v$.name.$invalid && formSubmitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Owner\'s Name')}}</small> -->
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="email" :class="{ 'p-invalid': false}" class="w-100" type="text" v-model="newUser.email"/>
                        <label for="email" :class="{ 'p-error': false}">Email</label>
                    </span>
                    <!-- <small v-if="(v$.name.$invalid && formSubmitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Owner\'s Name')}}</small> -->
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <Password id="password" :class="{ 'p-invalid': false}" class="w-100" inputClass="w-100" v-model="newUser.password" toggleMask></Password>
                        <label :class="{ 'p-error': false}" for="password">Password</label>
                    </span>
                    <!-- <small v-if="(v$.dateOfBirth.$invalid && formSubmitted) || v$.dateOfBirth.$pending.$response" class="p-error">{{ v$.dateOfBirth.required.$message.replace('Value', 'Date of birth')}}</small> -->
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <Password id="confirmPassword" :class="{ 'p-invalid': false}" class="w-100" inputClass="w-100" v-model="newUser.confirmPassword" toggleMask></Password>
                        <label for="confirmPassword" :class="{ 'p-error': false}">Confirm Password</label>
                    </span>
                    <!-- <small v-if="(v$.address.$invalid && formSubmitted) || v$.address.$pending.$response" class="p-error">{{ v$.address.required.$message.replace('Value', 'Address')}}</small> -->
                </section>
                <section class="d-flex flex-column mb-5">
                    <Button type="submit" label="Register" class="btn btn-primary mb-2" />
                    <section class="p-field pt-2">
                        <p class="text-center">
                            Already have an account? <router-link :to="{name: 'Login'}">Log In</router-link>
                        </p>
                    </section>
                </section>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { UserRegistrationDto } from '../../models/userRegistrationDto'
export default {
    name: 'Register',
    setup () {
        try {
            const route = useRoute();
            const router = useRouter();
            const storeName = 'authStore';
            const store = useStore();
            const state = reactive({
                showPopup: false,
                newUser: new UserRegistrationDto(),
                goBack() {
                    router.back();
                },
                closePopup() {

                },
                registerUser() {
                    try {
                        store.dispatch(`${storeName}/registerUser`, { route: 'register', userRegDto: this.newUser}).then((res) => {

                        }).catch(err => {

                        })
                    } catch (error) {
                        console.log(`Something went wrong: ${error}`);
                    }
                }
            });

            return {...toRefs(state)}
        } catch (error) {
            console.log(`Something went wrong with setup(): ${error}`);
        }

        return { }
        
    }
}
</script>

<style scoped>

</style>