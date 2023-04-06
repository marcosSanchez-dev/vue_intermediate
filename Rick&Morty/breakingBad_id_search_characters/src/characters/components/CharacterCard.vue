<script setup lang="ts">
import { toRef } from "vue";
import type { Character } from "../interfaces/character";
import { useRouter } from "vue-router";

const props = defineProps<{ character: Character }>();

// ! "character" se refiere a la propieda a la que se le hara referencia. Con esto evitamos hacer props.character.name
const character = toRef(props, "character");

const router = useRouter();

const goTo = () => {
  router.push(`by/${character.value.id}`);
};
</script>

<template>
  <div class="character-card" @click="goTo">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
    <p>soy CharacterCard.vue</p>
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

      ***** Comment:  Aqui se checa si el array incluye el valor del "character.id"*****
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
  cursor: pointer;
  width: fit-content;
}

img {
  width: 150px;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
  transition: all 0.5s;
}

img:hover {
  width: 150px;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.5);
  transition: all 0.5s;
}
</style>
