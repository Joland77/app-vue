<script setup>
import {onMounted, ref} from 'vue';
import Commentary from './Commentary.vue';
import Popup from './popup.vue';
import Navigateur from './Navigateur.vue';
import { useRouter } from 'vue-router';

const token =  localStorage.getItem('token');
const router = useRouter();

//const movies = ref(["Fight Club", "Weapons", "Parasite", "Superman", "Une bataille après l'autre", "Django"]);
const movies = ref([]);
const User = ref('');
const newmovie = ref("");
const showpopup = ref(false);
const indexadelete = ref(null);

onMounted( async () => 
{
  if(!token)
  {
    router.push('/');
  }

  try
  {
    const response = await fetch("http://localhost:3000/data",{
      method:'GET',
      headers:
      {
        Authorization: 'Bearer ' + token,
      },
    
    })
    const data = await response.json()
    const moviesU = data.movies;
  
    User.value = data.username;
    let i = 0;
    for (i=0; i<moviesU.length; i++)
      {
       movies.value.push(moviesU[i].title);
      }  

      console.log(movies)
  }

  catch(error)
  {
    console.log('echec du chargement des données');
  }

})

function deletemovie(compteur)
{
  indexadelete.value = compteur;
  showpopup.value = true;

console.log("showpopup vaut : ",  showpopup.value);
console.log("index à supprimer : ",indexadelete.value);
console.log("le film : ", movies[indexadelete]);
}

async function popupfinal(reponse)
{
  
  if (reponse === 'confirm' && indexadelete.value != null)
  {
    const movietitle = movies.value[indexadelete.value]
    try
    {
      const responsefetch = await fetch("http://localhost:3000/deletemovie",
      {
        method : "POST",
        headers :
         {
           'Content-type' : 'application/JSON',
           Authorization : 'Bearer ' + token,
          },
        body: JSON.stringify(
        {
          movie : movietitle,
        })
    
      })
      const data = await responsefetch.json();
      movies.value.splice(indexadelete.value, 1);
      console.log(data.message);
    }
    catch(error)
    {
      console.log(error);
    }
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
  <div id="world">
  <Navigateur></Navigateur>
  <div class="Welcome">
    <div id="avatar">
    </div>
    <div id="infos">
      <h1>Bonjour {{ User }}</h1>
      <p>Voici tout les films que tu as vu :</p>
    </div>
  </div>
  <div id="addmovie">
    <form id="newfilm" @submit.prevent="addmovie()">
      <h2>Tu as regardé un nouveau film ?</h2>
      <h4> Ajoute le !</h4>
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
    <div v-if="!movies"><h2>Commence dès maintenant à remplir ta liste de films visionnée et nous donner ton avis</h2> 
    <a href="/films"><p> Tout de suite !</p></a>
    </div>
  <ul>
    <li class="movie-item"v-for="(movie, compteur) in movies" :key="compteur">
      <div class="movieinfo">
        <div class="moviename">{{ movie }}</div>
      </div>
      <div class="deletebutton">
        <button   @click="deletemovie(compteur)" id="delete">Delete</button>
       </div>
      <div>
      <Commentary/>
      </div>
    </li>
  </ul>
  <button id="sort" @click="Sortmovies()">Réorganiser</button>
  </div>
  </div>
</template>

<style scoped>

#world
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

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

#Films
{
  padding: 0;
  background-color: #1F2937;
  list-style: none;
  border-radius: 15px;
  box-shadow: -14px 8px 16px rgba(0, 0, 0, 0.2);
  width: 80%;
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
  grid-template-columns: 300px 80px 1fr;
  gap: 20px;


  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #60A5FA;
  font-family: 'Inter', sans-serif;
  padding: 10px;
  width: 100%;
  height: 100px;
  min-height: 100px;
}

.Welcome
{
  display: grid;
  grid-template-columns: 400px 1fr;
  align-self: center;
  width: 60%;
  height: 400px;
  margin: 10px;
  margin-top: 90px;
  background-color: #1F2937;
}

.Welcome p, h1
{
  color: #E5E7EB;
}

#avatar
{
  width: 300px;
  height: 300px;
  border-radius: 100%;
  display: flex;
  align-self: center;
  justify-self: center;

  background-color: #60A5FA;
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
