<script setup lang="ts">
import { toRef } from "vue";
import type { Character } from "../interfaces/character";

const props = defineProps<{ character: Character }>();

// de esta forma aislo la variable que quiero de los props
const character = toRef(props, "character");
</script>

<template>
  <div class="character-card">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </div>

  <!-- ! Excluyendo elementos que no quiero -->
  <!-- 
    <div v-if="![3, 4, 7].includes(character.id)" class="character-card">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </div>
 -->

  <!-- ! Reemplazando elemento que no quiero -->
  <!-- 
    <div class="character-card">
    <img
      v-if="[3, 7].includes(character.id)"
      src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"
      alt="no image"
      srcset=""
    />
    <img v-else :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
  </div>
   -->
</template>

<style scoped>
.character-card {
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

img {
  width: 150px;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
}
</style>
