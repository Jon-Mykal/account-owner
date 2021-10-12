<template>
    <div>
        <Toast />
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
                        <InputText id="email" @input="email.value = userEmail" :class="{ 'p-invalid': !email.meta.valid && formSubmitted }" class="w-100" type="text" v-model="userEmail"/>
                        <label for="email" :class="{ 'p-error': !email.meta.valid && formSubmitted }">Email</label>
                    </span>
                    <small v-if="!email.meta.valid && formSubmitted" class="p-error">{{ email.errorMessage }}</small>
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <Button type="submit" label="Send" class="btn btn-primary mb-2" :disabled="!formConfig.meta.value.valid || isSubmitting" :loading="isSubmitting" />
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
import { useField, useForm} from 'vee-validate';
import { useToast} from 'primevue/usetoast';
import * as yup from 'yup';
export default {
    name: "ForgotPassword",
    setup () {
        try {
            const storeName = "authStore";
            const store = useStore();
            const router = useRouter();
            const toast = useToast();

            const valSchema = yup.object({
                email: yup.string().email().required().label('Email')
            });

            const formConfig = useForm({
                validationSchema: valSchema
            });

            const fieldsToValidate = reactive({
                email: useField('email')
            });

            const state = reactive({
                userEmail: "",
                formSubmitted: false,
                isSubmitting: false,
                showPopup: false,
                async forgotPassword() {
                    this.formSubmitted = true;
                    await formConfig.validate();
                    const isValid = formConfig.meta.value.valid;

                    if (!isValid) {
                        return;
                    }
                    // TODO: Put in environment
                    let baseURL = process.env.VUE_APP_LAUNCH_URL;
                    let clientURI = `${baseURL}/account/resetpassword`
                    let forgotPasswordDto = new ForgotPasswordDto(this.userEmail, clientURI);

                    this.isSubmitting = true;
                    store.dispatch(`${storeName}/forgotPassword`, { route: 'forgotpassword', forgotPasswordDto }).then(res => {
                        this.isSubmitting = false;
                        toast.add({severity:  'success', summary: 'Request Sent!', detail: res, life: 3500});
                    }).catch(err => {
                        this.isSubmitting = false;
                        if (err && err.response) {
                            
                        }
                        else {
                            toast.add({severity:  'error', summary: 'Network Error!', detail:'There seems to be a problem with the network. Try again later.', life: 3500});
                        }
                        console.log(err);
                    });
                },
                goBack() {
                    router.back();
                },
                closePopup() {

                }
            });

            return {...toRefs(state), ...toRefs(fieldsToValidate), formConfig}
        } catch (error) {
            console.log(`Something went wrong in setup(): ${error}`);
        }

        return {}
    }
}
</script>

<style scoped>

</style>