<script setup>
defineProps({
  toLink: {
    type: String,
  },
});
</script>

<template>
  <!-- <RouterLink to="/new-user">  -->
  <RouterLink
    :to="{ name: toLink }"
    class="block md:inline-block rounded bg-orange-500 p-2 mb-2 text-white text-sm shadow hover:bg-orange-600"
  >
    <slot></slot>
  </RouterLink>
</template>
