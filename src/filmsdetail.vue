<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navigateur from './Navigateur.vue';
import {useFilms} from './fonctions';

const {GoToFilm, addmovie, deletemovie} = useFilms();
const token = localStorage.getItem('token');

const route = useRoute();
const movie = ref(null);

const userfilmid = ref([]);

async function userfilms()
{
    try 
    {
        const response = await fetch("http://localhost:3000/data", 
        {
            method: 'GET',
            headers: 
            {
                Authorization : 'Bearer ' + token,
            }
        })

        const data = await response.json();
        userfilmid.value = data.movies.map(movies => movies.id);
        console.log("userfilmid = ", userfilmid.value)
        
    }
    catch(error)
    {
        console.log(error);
    }
}

async function loadslug()
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
}


function handlemovie(movie)
{
   if(ismovieadded(movie.id))
   {
    deletemovie(movie, userfilmid);
   }
   else
   {
    addmovie(movie, userfilmid);
   }
}

function ismovieadded(movieid)
{
    console.log(movieid);
    return userfilmid.value.includes(movieid);
}

onMounted( () =>
{
    userfilms();
    loadslug();
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
                <button :class="ismovieadded(movie.id) ? 'btn-delete' : 'btn-add'" @click="handlemovie(movie)">{{ ismovieadded(movie.id) ? 'Supprimer' : 'Ajouter' }}</button>
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

.btn-add
{
    border: none;
    background-color: #3B82F6;
    color: white;
    font-weight: bold;
    cursor: pointer;

    padding: 8px 14px;
}

.btn-add:hover
{
    background-color: #2563EB;
}

.btn-delete
{
    border: none;
    background-color: #EF4444;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 8px 14px;
}

.btn-delete:hover
{
    background-color: #ec3030;
}
</style>