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
  // console.log("Warding...", data);
  data.active = 1;
  UserService.addUser(data)
    .then((res) => {
      //console.log(res)
      //redirect:
      // router.push("/");
      router.push({ name: "users-list" });
    })
    .catch((err) => console.log("Data not added, " + err));
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
          submit-label="Add User"
          :submit-attrs="{
            help: 'Click to save the user',
          }"
          @submit="handleUserSubmit"
        >
          <FormKit
            type="text"
            label="Name"
            name="userName"
            placeholder="User name"
            validation="required"
            :validation-messages="{ required: 'User name is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            validation="required"
            :validation-messages="{ required: 'User Last Name is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
            validation="required|email"
            :validation-messages="{ required: 'User Email is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="text"
            label="Phone #"
            name="phoneNumber"
            placeholder="Phone: XXX-XXX-XXXX"
            validation="required|matches:/^\d{3}-\d{3}-\d{4}$/"
            :validation-messages="{ required: 'Phone # is required' }"
            validation-visibility="submit"
          />
          <FormKit
            type="text"
            label="Company"
            name="company"
            placeholder="Company"
          />
          <FormKit
            type="text"
            label="Job Title"
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
</style>
