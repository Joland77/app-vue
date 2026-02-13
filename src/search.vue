<script setup>
import {ref, watch} from 'vue';
import { useFilms } from './fonctions';

const {GoToFilm} = useFilms()

const searching = ref('');
const searchresult = ref([]);

    async function searchmovies()
    {

    if(searching.value.length < 2)
    {
        searchresult.value = [];
        return
    }
        try
        {
        const response = await fetch(`http://localhost:3000/films/search?q=${searching.value}`,
            {
            method : 'GET',
            headers : {'Content-Type' : 'application/json'}
            })
        const data = await response.json();
        searchresult.value = data

        console.log("data récupéré = ", data);
        }
        catch(error)
        {
        console.log('erreur :', error);
        }
    }

/*
async function pushfilm(movie)
{
  const slug = movie.slug;

  router.push(`/films/${slug}`)
}*/

watch(searching, () =>
{
    searchmovies();
})

</script>

<template>
    <div id="addmovie">
    <form id="newfilm" @submit.prevent="searchmovies()">
      <h2>Tu as regardé un nouveau film ?</h2>
      <h4> Ajoute le !</h4>
      <input type="text" name='searchfilm' v-model="searching">
      <div id="searchtab" v-if="searchresult.length > 0" >
        <ul>
            <li @click="GoToFilm(movie)" class="moviecard" v-for="movie in searchresult">

                <div class="filmtitle">
                  {{ movie.title }}
                  <div class="filmAffiche"></div>
                </div>
                <div class="filminfos">
                  <p>Note :</p>
                  <hr>
                  <p>Réalisateur : {{ movie.realisateur }} </p>
                  <p> date de sortie : {{new Date(movie.publication_date).toLocaleDateString('fr-FR') }}</p>
                  <p class="synopsis">{{ movie.synopsis }}</p>
                </div>
            </li>
        </ul>
      </div>
    </form>
  </div>
</template>


<style scoped>

#addmovie
{
    width: 70%;
  height: auto;
}
#newfilm
{
 padding-top: 10px;
 padding-bottom: 10px;
 margin-bottom: 10px;
 flex-direction: column;

  background-color: var(--bg-secondary);
  list-style: none;
  border-radius: 15px;
  box-shadow: -14px 8px 16px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}

#newfilm > h2 , h4 
{
  
  margin-top: 3px;
  margin-bottom: 5px;
  padding: 0;
  color: var(--text-primary);
}

#newfilm > h4 
{
  
  margin-top: 3px;
  margin-bottom: 5px;
  padding: 0;
  color: var(--text-secondary);
}

#newfilm > button
{
  width: 150px;
}

#searchtab
{
    margin-top: 10px;
    position: static;
    width: 500px;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    background-color: var(--bg-card);
    border: solid 5px var(--border-color);
}

ul
{
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
}

li
{
  list-style: none;
}

.moviecard
{
    display: flex;
    justify-content: flex-start;
    list-style: none;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    background-color: var(--bg-card);
}

.moviecard:hover
{
  background-color: var(--bg-hover) ;
  cursor: pointer;
}

.filmAffiche
{
    width: 100px;
    height: 90%;
    background-color:var(--bg-elevated);
}

.filmtitle
{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: var(--bg-secondary);
  color: var(--movie-title);
}

.filminfos p
{
  color:var(--text-secondary);
}

.synopsis
{
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  color: var(--text-secondary);
}


</style>