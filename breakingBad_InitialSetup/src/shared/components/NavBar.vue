<script setup lang="ts">
import type { RouterLinks } from "@/router/link-routes";

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
  links: RouterLinks[];
  showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  /*
    El valor por default de los 'links' es un array vacio y hay que declararlo de esta forma, 
    aunque en este caso es obligatorio pasarlo en props, segun lo declarado en la 'interface'
*/
  links: () => [],
});

console.log("props object: ", JSON.stringify(props));
</script>

<template>
  <nav>
    <img
      v-if="props.showIcon"
      src="@/assets/logo.svg"
      alt="Vue logo"
      height="25"
      width="25"
    />

    <!-- <span>{{ props.title || "valor por defecto sin prop" }}</span> -->
    <span v-if="props.title">{{ props.title }}</span>

    <!-- ! SIN uso de props -->
    <!-- 
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/characters">Characters</RouterLink>
     -->

    <!-- ! CON uso de props -->

    <RouterLink v-for="link of props.links" :key="link.path" :to="link.path">{{
      link.title
    }}</RouterLink>
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
  border: 1.5px dashed white;
  min-width: max-content;
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
  min-width: max-content;
}
</style>
