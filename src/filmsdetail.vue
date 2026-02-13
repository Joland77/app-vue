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
            <div class="filmtitle">
                <h1>{{ movie.title }}</h1>
                <div class="filmAffiche"></div>
            </div>
            <div class="filminfos">
                <h1>Note : </h1>
                <hr>
                <h2>{{ movie.realisateur }}</h2>
                <h4>{{ new Date(movie.publication_date).toLocaleDateString('fr-FR') }}</h4>
                <p>{{ movie.synopsis }}</p>
            </div>
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
    display: flex;
    justify-content: flex-start;
    flex-shrink: 0;
    margin-top: 100px;
    width: 1600px;
    height: 600px;
    background-color: var(--bg-secondary);
}

.filmtitle
{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 400px;
  margin: 10px;
  padding: 10px;
  background-color: var(--bg-secondary);
  color: var(--movie-title);
}

.filmAffiche
{
    width: 100%;
    height: 90%;
    background-color:var(--bg-elevated);
}

.filminfos
{
    
    margin-left: 10px;
    padding: 30px;
    width: 60%;
}
</style>