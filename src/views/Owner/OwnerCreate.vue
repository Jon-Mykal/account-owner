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
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Create Owner</h1>
                <form @submit.prevent="addOwner()" class="form-horizontal px-md-4 mx-2">
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="ownerName" @input="name.value = owner.name" :class="{ 'p-invalid': !name.meta.valid && formSubmitted}" class="w-100" type="text" v-model="owner.name"/>
                        <label for="ownerName" :class="{ 'p-error': !name.meta.valid && formSubmitted}">Owner's Name</label>
                    </span>
                    <small v-if="!name.meta.valid && formSubmitted" class="p-error">{{ name.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <Calendar id="dateOfBirth" @input="dateOfBirth.value = owner.dateOfBirth" :class="{ 'p-invalid': !dateOfBirth.meta.valid && formSubmitted}" class="w-100" v-model="owner.dateOfBirth" 
                        :showButtonBar="true"
                        :monthNavigator="true"
                        :yearNavigator="true"
                        :yearRange="dateRange"
                        :minDate="minDate"
                        :maxDate="maxDate" />
                        <label :class="{ 'p-error': !dateOfBirth.meta.valid && formSubmitted}" for="dateOfBirth">Date of birth</label>
                    </span>
                    <small v-if="!dateOfBirth.meta.valid && formSubmitted" class="p-error">{{ dateOfBirth.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3">
                    <span class="p-float-label">
                        <InputText id="address" @input="address.value = owner.address" :class="{ 'p-invalid': !address.meta.valid && formSubmitted}" class="w-100" v-model="owner.address"/>
                        <label for="address" :class="{ 'p-error': !address.meta.valid && formSubmitted }">Address</label>
                    </span>
                    <small v-if="!address.meta.valid && formSubmitted" class="p-error">{{ address.errorMessage }}</small>
                </section>
                <section class="d-flex flex-column mb-5">
                    <Button type="submit" label="Add Owner" class="btn btn-primary mb-2" />
                    <Button label="Cancel" class="btn btn-outline-secondary p-button-secondary p-button-outlined" @click="goBack()" />
                </section>
                </form>
            </section>
        </section>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
export default {
    name: "OwnerCreate",
    setup () {
        try {
            const store = useStore();
            const router = useRouter();
            const storeName = 'ownerStore';

            // Setup Validation Schema
            const valSchema = yup.object({
                name: yup.string().required().label('Owner\'s Name'),
                dateOfBirth: yup.date().required().label('Date of birth'),
                address: yup.string().required().label('Address')
            });

            // Add Schema to form
            const formConfig = useForm({
                validationSchema: valSchema
            });

            // Define fields to be validated
            const fieldsToValidate = reactive({
                name: useField('name'),
                dateOfBirth: useField('dateOfBirth'),
                address: useField('address')
            });

            const state = reactive({
                statusMessage: "",
                showPopup: false,
                isSuccessful: false,
                formSubmitted: false,
                dateRange: "1900:2050",
                minDate: new Date(),
                maxDate: new Date(),
                owner: {
                    name: "",
                    dateOfBirth: "",
                    address: ""
                },
                async addOwner() {
                    this.formSubmitted = true;

                    // Validate on submission
                    formConfig.setValues(this.owner);
                    await formConfig.validate();
                    const isFormValid = formConfig.meta.value.valid;
                    if (!isFormValid) {
                        return;
                    }
                    
                    store.dispatch(`${storeName}/addOwner`, this.owner).then((res) => {
                        this.statusMessage = "Owner successfully created!";
                         this.showPopup = true;
                        this.isSuccessful = true;
                    }).catch((error) => {
                         this.showPopup = true;
                         this.statusMessage = error;
                        console.log(`Something went wrong adding owner. See: ${error}`);
                    }); 
                },
                goBack() {
                    router.go(-1);
                },
                closePopup() {
                    if (this.isSuccessful) {
                        router.push({ name: 'OwnersList'});
                    }
                    else {
                        this.showPopup = false;
                    }
                }
            });
 
            // Configure date picker
            state.minDate.setMonth(0);
            state.minDate.setFullYear(1900);
            const rules = {
                name: { required },
                dateOfBirth: { required },
                address: { required }
            }
            const v$ = useVuelidate(rules, state);

            return { ...toRefs(state), ...toRefs(fieldsToValidate), formConfig };
        } catch (error) {
            console.log(`Something went wrong. See: ${error}`);
        }
    }
}
</script>

<style scoped>

</style>