<script setup>
// import { RouterLink } from "vue-router"; // No more needed for Vue 3 with VueRouter 4, already registered globally
import UserService from "@/services/UserService";
import { onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import RouterLinkBtn from "../components/UI/RouterLinkBtn.vue";
import Heading from "@/components/UI/Heading.vue";
import UsersList from "@/components/UI/UsersList.vue";

defineProps({
  title: {
    type: String,
  },
});

const users = ref([]);

onMounted(() => {
  UserService.getUsers()
    .then((res) => {
      users.value = res.data.data;
      // console.log("Users:", users.value); // Check here
    })
    .catch((err) => console.log("Error: " + err));
});

const existsUsers = computed(() => users.value.length > 0);

const updActive = ({ id, active }) => {
  // console.log("Updating...", id, active);
  UserService.updUserActive(id, { active: !active })
    .then(() => {
      const i = users.value.findIndex((user) => user._id === id);
      users.value[i].active = !active;
    })
    .catch((err) => console.log(err));
};

const delActive = (id) => {
  // console.log("deleting...", id);
  UserService.delUser(id)
    .then(() => {
      users.value = users.value.filter((user) => user._id !== id);
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLinkBtn toLink="new-user"> Add new user </RouterLinkBtn>
    </div>
    <Heading>{{ title }}</Heading>
    <!-- <div>
      {{ users }}
    </div> -->
    <div v-if="existsUsers" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Company
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="p-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <UsersList
                v-for="user in users"
                :key="user._id"
                :user="user"
                @c-update-active="updActive"
                @c-delete-user="delActive"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p v-else>No users registered</p>
  </div>
</template>
