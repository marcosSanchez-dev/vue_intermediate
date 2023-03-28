<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import { RouterView } from "vue-router";
import { characterRoute } from "../router";
import type { RouterLinks } from "@/router/link-routes";

const routeLinks: RouterLinks[] = characterRoute
  .children!.filter(
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

    <!-- <Suspense> -->
    <RouterView />
    <!-- </Suspense> -->
  </div>
</template>

<style scoped>
.layout-wrapper {
  background: darkgray;
  padding: 5%;
  color: white;
}
</style>
