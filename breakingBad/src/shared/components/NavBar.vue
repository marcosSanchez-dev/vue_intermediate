<script setup lang="ts">
import { RouterLink } from "vue-router";

// *** Sin typescript ***

// const props = defineProps({
//   title: {
//     type: String,
//     required: false,
//     default:'Soy un default',
//   },
// });

// *** Pocas props ***

// const props = defineProps<{ title?: string }>();

// *** Muchas props ***

interface Props {
  title?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <nav>
    <img src="@/assets/logo.svg" alt="Vue logo" height="25" width="25" />

    <span>{{ props.title || "sin prop" }}</span>

    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/characters">Characters</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  align-items: flex-start;
  display: flex;
  font-size: 25px;
  margin-top: 10px;
  text-align: center;
  width: 10%;
}
img {
  margin-right: 5px;
}
span {
  margin-right: 30px;
  min-width: max-content;
}
a {
  margin-right: 45px;
}
</style>
