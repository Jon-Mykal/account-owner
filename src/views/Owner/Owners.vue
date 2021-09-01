<template>
  <div>
    <router-link :to="{name: 'OwnerCreate'}" class="btn btn-primary">Create</router-link>
    <!-- <ul>
            <li v-for="owner in owners" :key="owner.id">
                <OwnerCard :owner="owner" />
            </li>
        </ul> -->
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
  </div>
</template>

<script>
import OwnerCard from "@/components/Owner/OwnerCard";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import OwnerRow from "../../components/Owner/OwnerRow.vue";

export default {
  components: {
    OwnerCard,
    OwnerRow
  },
  setup() {
    try {
      const store = useStore();
      const router = useRouter();
      const confirm = useConfirm();
      const storeName = "ownerStore";

      const routeData = {
        name: "",
        params: null,
      };
      const state = reactive({
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

      onMounted(() => {
        store
          .dispatch(`${storeName}/getOwners`, null, { root: true })
          .then((res) => {
            state.owners = res;
          })
          .catch((err) => {
            // Setup notification service
            console.log(err);
          });
      });

      return {
        ...toRefs(state),
        onMounted,
      };
    } catch (err) {}
  }
}
</script>

<style scoped></style>
