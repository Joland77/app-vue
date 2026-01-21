<script setup>
import {onMounted, ref} from 'vue';
import Commentary from './Commentary.vue';
import Popup from './popup.vue';

const movies = ref(["Fight Club", "Weapons", "Parasite", "Superman", "Une bataille après l'autre", "Django"]);
const User = ref('')
const newmovie = ref("");
const showpopup = ref(false);
const indexadelete = ref(null);

onMounted(() => 
{
  const storedUser = localStorage.getItem('user');
  User.value = storedUser;
})

function deletemovie(compteur)
{
  indexadelete.value = compteur;
  showpopup.value = true;

}

function popupfinal(reponse)
{
  
  if (reponse == 'confirm' && indexadelete != null)
  {
    movies.value.splice(indexadelete.value, 1);
  }

  showpopup.value = false;
  indexadelete.value = null;
}

function Sortmovies()
{
  movies.value.sort();
}
function addmovie()
{
  movies.value.unshift(newmovie.value);
  newmovie.value ="";
  console.log("un film est ajouté");
}

</script>

<template>
  <div class="Welcome">
  <h1>Bonjour {{ User }}</h1>
  <p>Voici tout les films que tu as vu :</p>
  </div>
  <div>
    <form id="newfilm" @submit.prevent="addmovie()">
      <input type="text" name='nouveaufilm' v-model="newmovie">
      <button >Ajouter</button>
    </form>
  </div>
  <Popup 
  :visible = "showpopup" 
  :index="indexadelete" 
  @actions="popupfinal"
  :movie = "movies[indexadelete]"
  >
</Popup>
  <div id = "Films">
  <ul>
    <li class="movie-item"v-for="(movie, compteur) in movies" :key="compteur">
      <div class="movieinfo">
        <div class="moviename">{{ movie }}</div>
        <div class="deletebutton">
        <button   @click="deletemovie(compteur)" id="delete">Delete</button>
       </div>
      </div>
      <div>
      <Commentary/>
      </div>
    </li>
  </ul>
  <button id="sort" @click="Sortmovies()">Réorganiser</button>
  </div>
</template>

<style scoped>

h1
{
  font-size: 60px;
  font-family: Helvetica;
  margin: 30px;
}

p
{
  left: 0px;
  font-size: 30px;
  font-family: Times;
}
#newfilm
{
 padding-top: 10px;
 padding-bottom: 10px;
 margin: 10px;

  background-color: rgb(168, 166, 179, 0.8);
  list-style: none;
  border-radius: 15px;
  box-shadow: -14px 8px 16px rgba(0, 0, 0, 0.2);
  width: 1500px;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

#Films
{
  padding: 0;
  background-color: rgb(168, 166, 179, 0.8);
  list-style: none;
  border-radius: 15px;
  box-shadow: -14px 8px 16px rgba(0, 0, 0, 0.2);
  width: 1500px;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}




ul
{
  display: flex;
  flex-direction: column;
  width: 95%;
}



.movie-item
{
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;


  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: rgb(73, 59, 133);
  font-family: 'Inter', sans-serif;
  padding: 10px;
  width: 100%;
  height: 100px;
  min-height: 100px;
}

.comment
{
  padding: 12px;
  background-color: rgb(35, 97, 97);
  border-radius: 8px;
  font-size: 14px;
  color: rgb(0, 0, 0);
  font-family: sans-serif;
  width: 60%;

  
  overflow: auto;
  resize: vertical;
}

.Welcome
{
  display: flex;
  flex-direction: column;
  align-items: center;
}

#sort
{
  align-self: center;
  margin: 10px;
  padding: 6px;
}

.deletebutton
{
  display: flex;
  align-items: center;
 justify-content: center;
 margin-left: auto;
 width: 80px;
 
 padding: 8px 16px; 
}

.movieinfo
{
 display: flex;
 align-items: center;
}


</style>
