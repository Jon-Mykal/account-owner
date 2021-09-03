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
                <form @submit.prevent="editOwner(!v$.$invalid)" class="form-horizontal">
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="ownerName" :class="{ 'p-invalid': v$.name.$invalid && formSubmitted}" class="w-100" type="text" v-model="v$.name.$model"/>
                        <label for="ownerName" :class="{ 'p-error': v$.name.$invalid && formSubmitted}">Owner's Name</label>
                    </span>
                    <small v-if="(v$.name.$invalid && formSubmitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace('Value', 'Owner\'s Name')}}</small>
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <Calendar id="dateOfBirth" :class="{ 'p-invalid': v$.dateOfBirth.$invalid && formSubmitted}" class="w-100" v-model="v$.dateOfBirth.$model" />
                        <label :class="{ 'p-error': v$.dateOfBirth.$invalid && formSubmitted}" for="dateOfBirth">Date of birth</label>
                    </span>
                    <small v-if="(v$.dateOfBirth.$invalid && formSubmitted) || v$.dateOfBirth.$pending.$response" class="p-error">{{ v$.dateOfBirth.required.$message.replace('Value', 'Date of birth')}}</small>
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="address" :class="{ 'p-invalid': v$.address.$invalid && formSubmitted}" class="w-100" v-model="v$.address.$model"/>
                        <label for="address" :class="{ 'p-error': v$.address.$invalid && formSubmitted }">Address</label>
                    </span>
                    <small v-if="(v$.address.$invalid && formSubmitted) || v$.address.$pending.$response" class="p-error">{{ v$.address.required.$message.replace('Value', 'Address')}}</small>
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
                editOwner(isFormValid) {
                    this.formSubmitted = true;

console.log(v$.name);
                    if (!isFormValid) {
                        return;
                    }
                    
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

            const rules = computed(() => {
                return {
                name: { required, $model: 'rwer' },
                dateOfBirth: { required },
                address: { required }
                }
             });
            const v$ = useVuelidate(rules, state, { $autoDirty: true });

            return { ...toRefs(state), onBeforeMount, v$ };

        } catch (error) {
            console.log(`Something went wrong. See: ${error}`);
        }
    }
}
</script>

<style scoped>

</style>