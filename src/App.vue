<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="bg-orange-400">
    <div class="mx-auto max-w-6xl py-10">
      <h1 class="py-10 text-5xl font font-extrabold text-white">
        Users Administration
      </h1>
    </div>
  </header>
  <main class="mx-auto max-w-6xl mt-10 p-5">
    <RouterView />
  </main>
</template>
