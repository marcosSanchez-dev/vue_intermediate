<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import { RouterView } from "vue-router";
import { characterRoute } from "../router";
import type { RouterLinks } from "@/router/link-routes";

const routeLinks: RouterLinks[] = characterRoute
  .children!.filter(
    // en esta linea especificas que children.props es un objeto y tiene una propiedad "visible" que es un booleano. Luego accedes a la propiedad para validar que sea true su valor
    (children) => (children.props as { visible: boolean }).visible
  )
  .map((children) => {
    return {
      path: children.path,
      name: children.name as string,
      title: (children.props as { title: string }).title,
    };
  });
</script>

<template>
  <div class="layout-wrapper">
    <h1>CharacterLayout.vue</h1>

    <!-- navBar -->
    <NavBar :show-icon="false" :links="routeLinks" />
    <!-- routerView + suspense -->
    <RouterView />
  </div>
</template>

<style scoped>
.layout-wrapper {
  background: darkgray;
  padding: 25%;
  color: white;
}
</style>
