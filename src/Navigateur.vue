<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function filmpage()
{
  router.push("/films")
}

function homepage()
{
  router.push('/app')
}

</script>

<template>
    <nav>
  <h2 v-on:click="homepage()">Home</h2>
  <h2>Amis</h2>
  <h2 v-on:click="filmpage()">Rechercher des films...</h2>
  <h2>Profile</h2>
  </nav>

</template>

<style scoped>
nav
{
  position: static;
  
  top: 0px;
  left: 10%;
  margin-top: 20px;
  width: 80%;
  height: 50px;
  background-color: var(--bg-secondary);
  border-radius: 2px;
  display: flex;
  gap: 70px;
}

nav h2
{
  margin-left: 20px;
  color: var(--text-primary);
}

nav h2:hover
{
  cursor: pointer;
}
</style>