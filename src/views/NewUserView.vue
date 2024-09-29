<script setup>
import { FormKit } from "@formkit/vue";
import { useRoute, useRouter } from "vue-router";
import UserService from "@/services/UserService";
import RouterLinkBtn from "../components/UI/RouterLinkBtn.vue";
import Heading from "@/components/UI/Heading.vue";

const router = useRouter();

defineProps({
  title: {
    type: String,
  },
});

const handleUserSubmit = (data) => {
  // Formkit implements preventDefault() by default
  data.active = 1;
  UserService.addUser(data)
    .then((res) => {
      router.push({ name: "users-list" });
    })
    .catch((err) => console.log("Data not added, " + err));
};
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-end mb-4">
      <RouterLinkBtn toLink="users-list"> Back to Users list </RouterLinkBtn>
    </div>

    <Heading>{{ title }}</Heading>

    <div class="mt-10 bg-white rounded-lg shadow-md p-6 md:w-2/3 mx-auto">
      <FormKit
        type="form"
        submit-label="Add User"
        :submit-attrs="{
          help: 'Click to save the user',
        }"
        @submit="handleUserSubmit"
        class="space-y-6"
      >
        <!-- Name Input -->
        <FormKit
          type="text"
          label="Name"
          name="userName"
          placeholder="User name"
          validation="required"
          :validation-messages="{ required: 'User name is required' }"
          validation-visibility="submit"
          input-class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          label-class="block text-sm font-medium text-gray-700"
        />

        <!-- Last Name Input -->
        <FormKit
          type="text"
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          validation="required"
          :validation-messages="{ required: 'User Last Name is required' }"
          validation-visibility="submit"
          input-class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          label-class="block text-sm font-medium text-gray-700"
        />

        <!-- Email Input -->
        <FormKit
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          validation="required|email"
          :validation-messages="{ required: 'User Email is required' }"
          validation-visibility="submit"
          input-class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          label-class="block text-sm font-medium text-gray-700"
        />

        <!-- Phone Number Input -->
        <FormKit
          type="text"
          label="Phone #"
          name="phoneNumber"
          placeholder="Phone: XXX-XXX-XXXX"
          validation="required|matches:/^\\d{3}-\\d{3}-\\d{4}$/"
          :validation-messages="{ required: 'Phone # is required' }"
          validation-visibility="submit"
          input-class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          label-class="block text-sm font-medium text-gray-700"
        />

        <!-- Company Input -->
        <FormKit
          type="text"
          label="Company"
          name="company"
          placeholder="Company"
          input-class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          label-class="block text-sm font-medium text-gray-700"
        />

        <!-- Job Title Input -->
        <FormKit
          type="text"
          label="Job Title"
          name="jobTitle"
          placeholder="Job Title"
          input-class="block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          label-class="block text-sm font-medium text-gray-700"
        />
      </FormKit>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>
