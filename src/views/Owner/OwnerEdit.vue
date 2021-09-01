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
                <h1 class="h3 my-3 py-3 font-weight-normal text-center">Edit Owner</h1>
                <form @submit.prevent class="form-horizontal">
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="ownerName" class="w-100" type="text" v-model="owner.name"/>
                        <label for="ownerName">Owner's Name</label>
                    </span>
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <Calendar id="dateOfBirth" class="w-100" v-model="owner.dateOfBirth" />
                        <label for="dateOfBirth">Date of birth</label>
                    </span>
                </section>
                <section class="form-group mb-3 pb-3 px-3">
                    <span class="p-float-label">
                        <InputText id="address" class="w-100" v-model="owner.address"/>
                        <label for="address">Address</label>
                    </span>
                </section>
                <section class="d-flex flex-column mb-5 px-3">
                    <Button label="Edit Owner" class="btn btn-primary mb-2" @click="editOwner()"/>
                    <Button label="Cancel" class="btn btn-outline-secondary" @click="goBack()" />
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
import { onMounted } from '@vue/runtime-core';
export default {
    name: "OwnerEdit",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup (props) {
        try {
            const store = useStore();
            const router = useRouter();
            const storeName = 'ownerStore';
            const state = reactive({
                statusMessage: "",
                showPopup: false,
                isSuccessful: false,
                owner: {
                },
                editOwner() {
                    store.dispatch(`${storeName}/editOwner`, {id: props.id, owner: this.owner}).then((res) => {
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

            onMounted(() => {
                store.dispatch(`${storeName}/getOwner`, props.id, { root: true}).then((res) => {
                    // let { name, dateOfBirth, address} = res
                    // state.owner.name = name;
                    // state.owner.dateOfBirth = dateOfBirth;
                    // state.owner.address = address;
                    state.owner = res;
                }).catch((err) => {
                    console.log(`Something went wrong. See: ${err}`);
                });
            });

            return { ...toRefs(state), onMounted };

        } catch (error) {
            console.log(`Something went wrong. See: ${error}`);
        }
    }
}
</script>

<style scoped>

</style>