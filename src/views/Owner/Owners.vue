<template>
    <div>
        <router-link to="/" class="btn btn-primary">Create</router-link>
        <!-- <ul>
            <li v-for="owner in owners" :key="owner.id">
                <OwnerCard :owner="owner" />
            </li>
        </ul> -->
        <section class="row">
            <section class="col-md-12">
                <section class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Owner Name</th>
                                <th>Owner Address</th>
                                <th>Date of Birth</th>
                                <th>Details</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <OwnerRow
                            v-for="owner in owners"
                            :key="owner.ownerId"
                            :owner="owner"
                            @click.native="onOwnerClicked(owner.ownerId)" />
                        </tbody>
                    </table>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import OwnerCard from '@/components/Owner/OwnerCard'
import { reactive, toRefs, onMounted } from 'vue'
import {useStore} from 'vuex'
import OwnerRow from '../../components/Owner/OwnerRow.vue'

export default {
    components: {
        OwnerCard,
        OwnerRow
    },
    setup () {
        const store = useStore();
        const storeName = 'ownerStore';
        const state = reactive({
            owners: [],
            onOwnerClicked(ownerId) {
                console.log(ownerId);
            }
        });
       
       onMounted(() => {
           store.dispatch(`${storeName}/getOwners`, null, {root: true}).then((res) => {
               state.owners = res;
           }).catch((err) => {
               // Setup notification service
               console.log(err);
           });
       });
    

        return {
            ...toRefs(state),
            onMounted
        }
    }
}
</script>

<style scoped>

</style>