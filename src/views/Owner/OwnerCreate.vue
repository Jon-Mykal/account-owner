<template>
    <div>
        <Dialog header="Status" v-model:visible="showPopup" :modal="true">
            <p :innerHTML="statusMessage">

            </p>
            <template #footer>
                <Button label="Ok" @click="closePopup()"/>
            </template>
        </Dialog>
        <section class="form-wrapper">
            <form @submit.prevent>
                <section class="form-group">
                    <span class="p-float-label">
                        <InputText id="ownerName" type="text" v-model="owner.name"/>
                        <label for="ownerName">Owner's Name</label>
                    </span>
                </section>
                <section class="form-group">
                    <span class="p-float-label">
                        <Calendar id="dateOfBirth" v-model="owner.dateOfBirth" />
                        <label for="dateOfBirth">Date of birth</label>
                    </span>
                </section>
                <section class="form-group">
                    <span class="p-float-label">
                        <InputText id="address" v-model="owner.address"/>
                        <label for="address">Address</label>
                    </span>
                </section>
                <section class="form-group">
                    <Button label="Add Owner" @click="addOwner()"/>
                    <Button label="Cancel" @click="goBack()" />
                </section>
            </form>
        </section>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    name: "OwnerCreate",
    setup () {
        try {
            const store = useStore();
            const router = useRouter();
            const storeName = 'ownerStore';
            const state = reactive({
                statusMessage: "",
                showPopup: false,
                isSuccessful: false,
                owner: {
                    name: "",
                    dateOfBirth: "",
                    address: ""
                },
                addOwner() {
                    //store.dispatch(`$`)
                   
                    store.dispatch(`${storeName}/addOwner`).then((res) => {
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
                        router.push({ name: 'Owners'});
                    }
                    else {
                        this.showPopup = false;
                    }
                }
            });

            return { ...toRefs(state) };
        } catch (error) {
            console.log(`Something went wrong. See: ${error}`);
        }
    }
}
</script>

<style scoped>

</style>