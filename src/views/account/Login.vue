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
                    <!-- <small v-if="(v$.dateOfBirth.$invalid && formSubmitted) || v$.dateOfBirth.$pending.$response" class="p-error">{{ v$.dateOfBirth.required.$message.replace('Value', 'Date of birth')}}</small> -->
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <Button type="submit" label="Login" class="btn btn-primary mb-2" />
                    <Button label="Cancel" class="btn btn-outline-secondary p-button-secondary p-button-outlined" @click="goBack()" />
                </section>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
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
        

        const state = reactive({
            user: new UserAuthDto(),
            showPopup: false,
            loginUser() {
                
                store.dispatch(`${storeName}/loginUser`, {route: 'login', userAuthDto: this.user}).then(res => {
                    router.push(returnUrl);
                }).catch(err => {

                })
            },
            goBack() {
                router.back();
            },
            closePopup() {

            }
        });
        return {...toRefs(state)}
    }
}
</script>

<style scoped>

</style>