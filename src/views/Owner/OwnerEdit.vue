<template>
    <section v-show="loading">
        ...Loading
    </section>
    <section v-show="!loading">
    <div v-show="(ownerFound && (!hasNetworkIssue))">
        <Dialog header="Status" v-model:visible="showPopup" :modal="true">
            <p :innerHTML="statusMessage">

            </p>
            <template #footer>
                <Button label="Ok" @click="closePopup()"/>
            </template>
        </Dialog>
        <section class="d-flex justify-content-center">
            <section class="form-wrapper w-25 mt-5 shadow">
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Edit Owner</h1>
                <form @submit.prevent="editOwner(!false)" class="form-horizontal">
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="ownerName" :class="{ 'p-invalid': nameVal.errorMessage && formSubmitted}" class="w-100" type="text"  v-model="nameVal.value" />
                        <label for="ownerName" :class="{ 'p-error': nameVal.errorMessage && formSubmitted }">Owner's Name</label>
                    </span>
                    <small v-if="nameVal.errorMessage && formSubmitted" class="p-error">{{ nameVal.errorMessage }}</small>
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <Calendar id="dateOfBirth" :class="{ 'p-invalid': formSubmitted }" class="w-100" v-model="dateOfBirthVal.value" />
                        <label :class="{ 'p-error': formSubmitted }" for="dateOfBirth">Date of birth</label>
                    </span>
                    <small v-if="dateOfBirthVal.errorMessage && formSubmitted" class="p-error">{{dateOfBirthVal.errorMessage}}</small>
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="address" :class="{ 'p-invalid': addressVal.errorMessage && formSubmitted}" class="w-100" v-model="addressVal.value"/>
                        <label for="address" :class="{ 'p-error': addressVal.errorMessage && formSubmitted }">Address</label>
                    </span>
                    <small v-if="addressVal.errorMessage && formSubmitted" class="p-error">Address errors</small>
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <Button type="submit" label="Edit Owner" class="btn btn-primary mb-2" />
                    <Button label="Cancel" class="btn btn-outline-secondary p-button-secondary p-button-outlined" @click="goBack()" />
                </section>
                </form>
            </section>
        </section>
    </div>
    <section v-show="hasNetworkIssue">
        <NetworkIssue />
    </section>
    <section v-show="!hasNetworkIssue && !ownerFound">
        <NotFound resource="owner"/>
    </section>

</section>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onBeforeMount } from '@vue/runtime-core';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import NetworkIssue from '../../views/errorpages/NetworkIssue.vue';
import NotFound from '../../views/errorpages/NotFound.vue';
import { usePageLoading } from '@/composables/usePageLoading';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
    name: "OwnerEdit",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        NetworkIssue,
        NotFound
    },
    setup (props) {
        try {
            const store = useStore();
            const router = useRouter();
            const storeName = 'ownerStore';
            const pageLoader = usePageLoading();  
            
            const valSchema = yup.object({
                name: yup.string().required().label('Owner\'s name'),
                dateOfBirth: yup.date().required().label('Date of birth'),
                address: yup.string().required().label('Address')
            });

            const formConfig = useForm({
                validationSchema: valSchema
            });

            const validations = reactive({
                nameVal: useField('name'),
                dateOfBirthVal: useField('dateOfBirth'),
                addressVal: useField('address')
            });


            const state = reactive({
                statusMessage: "",
                showPopup: false,
                isSuccessful: false,
                formSubmitted: false,
                hasNetworkIssue: false,
                loading: false,
                ownerFound: false,
                owner: {
                    name: "",
                    dateOfBirth: "",
                    address: ""
                },
                testInput(event) {
                    console.log(event);
                },
                editOwner(isFormValid) {
                    this.formSubmitted = true;
                    if (!isFormValid) {
                        return;
                    }

                    return;
                    
                    this.loading = true;
                    store.dispatch(`${storeName}/editOwner`, {id: props.id, owner: this.owner}).then((res) => {
                        this.loading = false;
                        this.statusMessage = "Owner successfully updated!";
                         this.showPopup = true;
                        this.isSuccessful = true;
                        
                    }).catch((error) => {
                        this.loading = false;
                         this.showPopup = true;
                         this.statusMessage = error;
                         
                        if (error && error.response.status.startsWith('5')) {
                            
                        }
                        else {
                            state.hasNetworkIssue = true;
                        }
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

            onBeforeMount(() => {
                state.loading = true;
                store.dispatch(`${storeName}/getOwner`, props.id, { root: true}).then((res) => {
                    // let { name, dateOfBirth, address} = res
                    // state.owner.name = name;
                    // state.owner.dateOfBirth = dateOfBirth;
                    // state.owner.address = address;
                    pageLoader.closeLoading();
                    state.loading = false;
                    state.owner = res;
                    state.ownerFound = true;
                    // formConfig.setValues({
                    //     name: state.owner.name,
                    //     dateOfBirth: state.owner.dateOfBirth,
                    //     address: state.owner.address
                    // })
                    formConfig.setValues(state.owner);
                }).catch((err) => {
                    pageLoader.closeLoading();
                    state.loading = false;

                    if (err && err.response) {
                        if (err.response.status === "200") {
                            state.ownerFound = true;
                        }
                    }
                    else {
                        state.hasNetworkIssue = true;
                    }
                    console.log(`Something went wrong. See: ${err}`);
                });
            });
             
            
            return { ...toRefs(state), ...toRefs(validations), onBeforeMount, formConfig};

        } catch (error) {
            console.log(`Something went wrong. See: ${error}`);
        }
    }
}
</script>

<style scoped>

</style>