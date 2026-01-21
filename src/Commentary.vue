<template>
<div id="comment">
    <form v-if="Postedcomment === ''"  @submit.prevent ="Newcomment">
        <input  type="text" v-model="newcomment"></input>
        <button>Envoyer</button>
    </form>
    <p class="comment" v-if="Postedcomment !== '' ">{{ Postedcomment }}</p>
</div>
</template>

<script setup>
import { ref } from 'vue';
const newcomment = ref("");
const Postedcomment = ref("");

function Newcomment()
{
    Postedcomment.value = newcomment.value;
    console.log("Commentaire ajouté")
}

</script>

<style scoped>
#comment
{
    width: 100%;
    height: 100%;
    display: flex;
  align-items: center;
  justify-content: center;
}
</style>