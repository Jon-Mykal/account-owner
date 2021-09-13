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
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Reset Password</h1>
                <form @submit.prevent="resetPassword()" class="form-horizontal">
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <Password id="password" :class="{ 'p-invalid': false}" class="w-100" inputClass="w-100" v-model="resetData.password" toggleMask></Password>
                        <label :class="{ 'p-error': false}" for="password">Password</label>
                    </span>
                    <!-- <small v-if="(v$.dateOfBirth.$invalid && formSubmitted) || v$.dateOfBirth.$pending.$response" class="p-error">{{ v$.dateOfBirth.required.$message.replace('Value', 'Date of birth')}}</small> -->
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <Password id="confirmPassword" :class="{ 'p-invalid': false}" class="w-100" inputClass="w-100" v-model="resetData.confirmPassword" toggleMask></Password>
                        <label for="confirmPassword" :class="{ 'p-error': false}">Confirm Password</label>
                    </span>
                    <!-- <small v-if="(v$.address.$invalid && formSubmitted) || v$.address.$pending.$response" class="p-error">{{ v$.address.required.$message.replace('Value', 'Address')}}</small> -->
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <Button type="submit" label="Reset Password" class="btn btn-primary mb-2" />
                    <Button label="Cancel" class="btn btn-outline-secondary p-button-secondary p-button-outlined" @click="goBack()" />
                </section>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup () {
        
        try {
            const storeName = "authStore";
            const store = useStore();
            const route = useRoute();
            const router = useRouter();

            const state = reactive({
                resetData: {
                    email: "",
                    token: "",
                    password: "",
                    confirmPassword: ""
                },
                showPopup: false,
                resetPassword() {
                    this.resetData.email = route.query["email"];
                    this.resetData.token = route.query["token"];

                    store.dispatch(`${storeName}/resetPassword`, {route: 'resetpassword', resetPasswordDto: this.resetData }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err)
                    });
                },
                goBack() {
                    router.back();
                }
            });

            return {...toRefs(state)};
        } catch (error) {
            console.log(`Something went wrong: ${error}`);
        }

        return {};
    }
}
</script>

<style scoped>

</style>