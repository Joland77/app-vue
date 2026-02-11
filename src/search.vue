<script setup>
import {ref, watch} from 'vue';

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
            <li class="moviecard" v-for="movie in searchresult">

                <div class="filmtitle">
                  {{ movie.title }}
                  <div class="filmAffiche"></div>
                </div>
                <div class="filminfos">
                  <p>Note :</p>
                  <hr>
                  <p>{{ movie.realisateur }} </p>
                  <p>{{new Date(movie.publication_date).toLocaleDateString('fr-FR') }}</p>
                  <p>{{ movie.synopsis }}</p>
                </div>
            </li>
        </ul>
      </div>
      <button >Ajouter</button>
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

  background-color: #1F2937;
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
  color: #9CA3AF;
}

#newfilm > button
{
  width: 150px;
}

#searchtab
{
    position: static;
    width: 500px;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    background-color: #252C3A;
}

ul
{
  margin: 0;
  padding: 5px;
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
    max-height: 210px;
    overflow-y: hidden;
    background-color: #0D1117;
}

.filmAffiche
{
    width: 100px;
    height: 90px;
    background-color: #60A5FA;
}

.filmtitle
{

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #1F2937;
  color: #FBBF24;
}


</style>