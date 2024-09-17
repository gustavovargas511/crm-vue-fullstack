<script setup>
import { onMounted, reactive, ref } from "vue";
import { FormKit } from "@formkit/vue";
import { useRoute, useRouter } from "vue-router";
import UserService from "@/services/UserService";
import RouterLinkBtn from "../components/UI/RouterLinkBtn.vue";
import Heading from "@/components/UI/Heading.vue";

const router = useRouter();
const route = useRoute();

const { id } = route.params;
// console.log(id);

// const formData = reactive({});
const formData = ref({});

onMounted(() => {
  UserService.getUser(id)
    .then((res) => {
      //   console.log(data);
      //   Object.assign(formData, data);
      formData.value = res.data.data;
    })
    .catch((err) => console.log(err));
});

defineProps({
  title: {
    type: String,
  },
});

const handleUserSubmit = (data) => {
  UserService.updUser(id, data)
    .then(() => router.push({ name: "users-list" }))
    .catch((err) => console.log(err));
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <!-- <RouterLink to="/new-user">  -->
      <RouterLinkBtn toLink="users-list"> Back to Users list </RouterLinkBtn>
    </div>
    <Heading>{{ title }}</Heading>
    <!-- <h1 class="text-4xl font-extrabold text-gray-500">Add New User</h1> -->

    <div class="mx-auto mt-10 bg-gray-100 shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Update User"
          :submit-attrs="{
            help: 'Click to update the user',
            class: 'update-button',
          }"
          @submit="handleUserSubmit"
        >
          <FormKit
            type="text"
            label="Name"
            v-model="formData.userName"
            name="userName"
            placeholder="User name"
            validation="required"
            :validation-messages="{ required: 'User name is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="text"
            label="Last Name"
            v-model="formData.lastName"
            name="lastName"
            placeholder="Last Name"
            validation="required"
            :validation-messages="{ required: 'User Last Name is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="email"
            label="Email"
            v-model="formData.email"
            name="email"
            placeholder="Email"
            validation="required|email"
            :validation-messages="{ required: 'User Email is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="text"
            label="Phone #"
            v-model="formData.phoneNumber"
            name="phoneNumber"
            placeholder="Phone: XXX-XXX-XXXX"
            validation="required|matches:/^\d{3}-\d{3}-\d{4}$/"
            :validation-messages="{ required: 'Phone # is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="text"
            label="Company"
            v-model="formData.company"
            name="company"
            placeholder="Company"
          />
          <FormKit
            type="text"
            label="Job Title"
            v-model="formData.jobTitle"
            name="jobTitle"
            placeholder="Job Title"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}

.update-button {
  background-color: #22c55e; /* Equivalent to bg-green-500 */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.update-button:hover {
  background-color: #15803d; /* Equivalent to hover:bg-green-700 */
}
</style>
