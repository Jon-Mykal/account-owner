<template>
    <div>
        <ul>
            <li v-for="owner in owners" :key="owner.id">
                {{owner}}
            </li>
        </ul>
        <Fieldset legend="Header">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Fieldset>
        
    </div>
</template>

<script>
import OwnerCard from '@/components/Owner/OwnerCard'
import Fieldset from 'primevue/fieldset/sfc'
import { reactive, toRefs, onMounted } from 'vue'
import {useStore} from 'vuex'

export default {
    components: {
        OwnerCard,
        Fieldset
    },
    setup () {
        const store = useStore();
        const storeName = 'ownerStore';
        const state = reactive({
            owners: []
        });
       
       onMounted(() => {
           store.dispatch(`${storeName}/getOwners`, null, {root: true}).then((res) => {
               state.owners = res;
               console.log(res);
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