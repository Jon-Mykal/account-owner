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
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Forgot Password</h1>
                <form @submit.prevent="forgotPassword()" class="form-horizontal">
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="email" :class="{ 'p-invalid': false}" class="w-100" type="text" v-model="userEmail"/>
                        <label for="email" :class="{ 'p-error': false}">Email</label>
                    </span>
                    <!-- <small v-if="(v$.name.$invalid && formSubmitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Owner\'s Name')}}</small> -->
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <Button type="submit" label="Send" class="btn btn-primary mb-2" />
                    <Button label="Cancel" class="btn btn-outline-secondary p-button-secondary p-button-outlined" @click="goBack()" />
                </section>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { ForgotPasswordDto} from '../../models/forgotPasswordDto'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: "ForgotPassword",
    setup () {
        try {
            const storeName = "authStore";
            const store = useStore();
            const router = useRouter();

            const state = reactive({
                userEmail: "",
                showPopup: false,
                forgotPassword() {
                    // TODO: Put in environment
                    let baseURL = process.env.VUE_APP_LAUNCH_URL;
                    let clientURI = `${baseURL}/account/resetpassword`
                    let forgotPasswordDto = new ForgotPasswordDto(this.userEmail, clientURI);

                    store.dispatch(`${storeName}/forgotPassword`, { route: 'forgotpassword', forgotPasswordDto }).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(err);
                    });
                },
                goBack() {
                    router.back();
                },
                closePopup() {

                }
            });

            return {...toRefs(state)}
        } catch (error) {
            console.log(`Something went wrong in setup(): ${error}`);
        }

        return {}
    }
}
</script>

<style scoped>

</style>