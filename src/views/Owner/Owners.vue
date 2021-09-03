<template>
  <section v-if="hasNetworkIssue">
    <NetworkIssue resource="owners"/>
  </section>
  <div v-else>
    <section v-if="loading">
        ...Loading
    </section>
    <section v-else>
      <router-link :to="{name: 'OwnerCreate'}" class="btn btn-primary">Create</router-link>

      <ConfirmDialog></ConfirmDialog>
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
                  @viewDetails="viewDetails"
                  @editOwner="editOwner"
                  @removeOwner="removeOwner"
                />
              </tbody>
            </table>
          </section>
        </section>
      </section>
    </section>

  </div>
</template>

<script>
import OwnerCard from "@/components/Owner/OwnerCard";
import { reactive, toRefs, onMounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import store from '@/store/index'
import OwnerRow from "../../components/Owner/OwnerRow.vue";
import NetworkIssue from '../../views/errorpages/NetworkIssue.vue';
import { usePageLoading } from '@/composables/usePageLoading';

export default {
  props: {

  },
  components: {
    OwnerCard,
    OwnerRow,
    NetworkIssue
  },
  setup(props) {
    try {
      const storeV3 = useStore();
      const router = useRouter();
      const confirm = useConfirm();
      const storeName = "ownerStore";
      const pageLoader = usePageLoading();

      const routeData = {
        name: "",
        params: null,
      };
      const state = reactive({
        loading: false,
        hasNetworkIssue: false,
        owners: [],
        selectedOwner: null,
        viewDetails(ownerId) {
          routeData.name = "OwnerDetails";
          routeData.params = { id: ownerId };
          router.push(routeData);
        },
        editOwner(ownerId) {
          routeData.name = "OwnerEdit";
          routeData.params = { id: ownerId };
          router.push(routeData);
        },
        removeOwner(ownerId) {
          confirm.require({
            message: "Are you sure you want to delete this owner?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept() {
              store
                .dispatch(`${storeName}/deleteOwner`, ownerId, { root: true })
                .then((owners) => {
                  confirm.require({
                    message: "Successfully removed owner",
                    header: "Status",
                    icon: "pi pi-exclamation-triangle"
                  });
                })
                .catch((err) => {
                  confirm.require({
                    message: "Failed to removed owner. Please try again.",
                    header: "Status",
                    icon: "pi pi-danger-circle",
                  });
                  console.log(
                    `Something went wrong trying to remove owner. ${err}}`
                  );
                });
            }
          });
        }
      });

      onBeforeMount(() => {
        state.loading = true;
        storeV3
          .dispatch(`${storeName}/getOwners`, null, { root: true })
          .then((res) => {
            pageLoader.closeLoading();
            state.loading = false;
            state.owners = res;
          })
          .catch((err) => {
            pageLoader.closeLoading();
            state.loading = false;
            if (err.response && err.response.status.startsWith('5')) {
              // Server error
            }
            else {
              // Network error
              state.hasNetworkIssue = true;
            }
            // Setup notification service
            console.log(err);
          });
      });

      return {
        ...toRefs(state),
        onBeforeMount,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // beforeRouteEnter(routeTo, from, next) {
  //   // One method of loading the page
  //   // const storeName = "ownerStore";
  //   // try {
  //   //     store
  //   //       .dispatch(`${storeName}/getOwners`, null, { root: true })
  //   //       .then((res) => {
  //   //         routeTo.params.owners = res;
  //   //       })
  //   //       .catch((err) => {
  //   //         if (err.response && err.response.status == 404) {
  //   //           next({ name: '404', params: { resource: 'owners' }})
  //   //         }
  //   //         else {
  //   //           next({ name: 'NetworkIssue'})
  //   //         }
  //   //         // Setup notification service
  //   //         console.log(err);
  //   //       });
  //   // } catch (error) {
  //   //   console.log("Something went wrong", error);
  //   // }


  //   // console.log("Component has been routed to", store);
  // }
}
</script>

<style scoped></style>
