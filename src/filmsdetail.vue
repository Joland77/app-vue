<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navigateur from './Navigateur.vue';

const route = useRoute();
const movie = ref(null);

onMounted(async () =>
{
    const slug = route.params.slug;

    try
    {
        const response = await fetch(`http://localhost:3000/films/${slug}`,
        {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}
        })

        const data = await response.json()
        movie.value = data[0];
        console.log("le tableau movie a = ", movie.value);
    }
    catch(error)
    {
        console.log('impossible de charger les détails du film', error);
    }
})

</script>


<template>
    <div id="world">
        <Navigateur></Navigateur>
        <div id="data" v-if="movie">
            {{ movie.title }}
            {{ movie.realisateur }}
            {{ new Date(movie.publication_date).toLocaleDateString('fr-FR') }}
            {{ movie.synopsis }}
        </div>
    </div>
</template>



<style scoped>
#world
{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

#data
{
    margin-top: 100px;
    width: 1600px;
    height: 600px;
    background-color: var(--bg-secondary);
}
</style>