<template>
    <div>
        <section class="well">
            <section class="row">
                <section class="col-md-3">
                    <strong>Owner Name:</strong>
                </section>
                <section class="col-md-3">
                    {{ owner.name }}
                </section>
            </section>
            <section class="row">
                <section class="col-md-3">
                    <strong>Date of birth:</strong>
                </section>
                <section class="col-md-3">
                    {{ owner.dateOfBirth }}
                </section>
            </section>
            <section v-if="owner.accounts && owner.accounts.length <= 2" class="row">
                <section class="col-md-3">
                    <strong>Type of user:</strong>
                </section>
                <section class="col-md-3">
                    <span class="text-success">Beginner user.</span>
                </section>
            </section>
            <section v-else class="row">
                <section class="col-md-3">
                    <strong>Type of user:</strong>
                </section>
                <section class="col-md-3">
                    <span class="text-info">Advanced user.</span>
                </section>
            </section>

            <section class="row">
                <section class="col-md-12">
                    <section class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Account type</th>
                                    <th>Date created</th>
                                </tr>
                            </thead>
                            <tbody v-if="owner.accounts && owner.accounts.length > 0">
                                <tr v-for="account in owner.accounts" :key="account.accountId">
                                    <td>{{ account.accountType }}</td>
                                    <td>{{ account.dateCreated }}</td>
                                </tr>
                            </tbody>
                            <p v-else>
                                No accounts to view
                            </p>
                        </table>
                    </section>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import {useStore} from 'vuex'
import { onMounted } from '@vue/runtime-core';
export default {
    name: 'OwnerDetails',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup (props) {
        try {
            const storeName = 'ownerStore'
            const store = useStore();
            const state = reactive({
                owner: {}
            });

            onMounted(() => {
                store.dispatch(`${storeName}/getOwnerAccounts`, props.id, { root: true}).then((res) => {
                    state.owner = res;
                }).catch((err) => {
                    console.log(`Something went wrong. See: ${err}`);
                });
            });


            return {...toRefs(state), onMounted };

        } catch (error) {
            console.log(`Something went wrong with displaying the details. ${error}`);
            return {};
        }

    }
}
</script>

<style scoped>

</style>