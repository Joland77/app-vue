<script setup>
import {ref, onMounted, watch, computed} from 'vue';
import { useRouter } from 'vue-router';
import Navigateur from './Navigateur.vue';
import {useFilms} from './fonctions';

const token =  localStorage.getItem('token');

const router = useRouter();
const {GoToFilm} = useFilms();

const filmdatabase = ref([]); // toutes les données des films dans la base de données
const userfilmid = ref([]); // id des films déjà dans la liste de l'utilisateur

const page = ref(1);
const limit = ref(5);

const totalpages = ref(0);
const totalfilms = ref(0);

const status = ref(false);

const loadfilm = async () => {

    try 
    {
        const response = await fetch(`http://localhost:3000/films?page=${page.value}&limit=${limit.value}`,
        {
            method: 'GET',
        })

        const result = await response.json()
        filmdatabase.value = result.films;
        const pagination = result.pagination;

        totalpages.value = pagination.totalpages;
        totalfilms.value = pagination.totalfilms
        
    }
    catch(error)
    {
        console.log("erreur", error);
    }
    
   
}

//pour savoir quelles films sont déjà ajoutés par l'user
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

function ismovieadded(movieid)
{
    return userfilmid.value.includes(movieid);
}

function handlemovie(movie)
{
   if(ismovieadded(movie.id))
   {
    deletemovie(movie);
   }
   else
   {
    addmovie(movie);
   }
}

const addmovie = async (movie) =>
{
    try
    {
        const response = await fetch("http://localhost:3000/addmovie",
        {
            method: 'POST',
            headers: 
            {
                'Content-type' : 'application/json',
                Authorization : 'Bearer ' + token,
            },

            body: JSON.stringify({
                title : movie.title,
            })
        })
        const data = await response.json();
        const code = response.status;

         if(code == 200)
         {
            userfilmid.value.push(movie.id);
         }
    {
      console.log(data.message);  
    }
    
    }
    catch(error)
    {
        console.log("erreur lors de l'ajout du film");
    }

}

const deletemovie = async (movie) =>
{
    try
    {
        const response = await fetch("http://localhost:3000/deletemovie",
        {
            method : 'POST',
            headers : 
            {
                'Content-type' : 'application/json',
                Authorization : 'Bearer ' + token,
            },
            body : JSON.stringify(
                {
                    movie : movie.title
                })
        })

        const data = await response.json();
        const code = response.status;

         if(code == 200)
         {
            userfilmid.value = userfilmid.value.filter(id => id !== movie.id);
            //reconstruire le tableau sans le film qu'on a supprimé en gros
         }
    }
    catch(error)
    {
        console.log(error);
    }
}

onMounted(() =>
{
    loadfilm();
    userfilms();
})


watch(limit,() =>
{
    page.value = 1;
    loadfilm();
})

watch(page,() =>
{
    loadfilm();
})

function nextpage()
{
    if(page.value < totalpages.value)
    {
        page.value++;
        console.log("page numéro =", page.value)
    }
}

function previouspage()
{
    if(page.value > 1)
    {
        page.value--;
        console.log("page numéro =", page.value)
    }
}

</script>

<template>

    <div id="world">
        
        <div id="main">
            <Navigateur></Navigateur>
            <div id="maininfo">
                <h2>Ajoutez les films que vous avez vu ou ceux que vous comptez voir !</h2>
            </div>
        <hr id="separateur1">
            <div id="filmcontainer">
                
                <div id="pageselection">
                <h2>Pages</h2>
                <button @click="previouspage"><<</button>
                <p id="1" v-if="page > 1">{{ page - 1 }}</p>
                <p v-else>0</p>
                <p id="2">{{ page }}</p>
                <p id="3" v-if="page != totalpages">{{ page + 1 }}</p>
                <p v-else>Nada</p>
                <button @click="nextpage">>></button>

                <select v-model="limit">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                </div>
                <ul class="movieselection">
                    <li class="moviecard" v-for="movie in filmdatabase" :key="movie.id">
                    <div class="filmtitle" @click="GoToFilm(movie)">
                        <h2>{{ movie.title }}</h2>
                        <div class="filmAffiche"></div>
                    </div>

                    <div class="filminfos">
                        <h1>Note</h1>
                        <hr id="separateur2">
                        <p>Date de parution : {{ new Date(movie.publication_date).toLocaleDateString('fr-FR') }}</p> 
                        <p>Réalisateur : {{ movie.realisateur }}</p>
                        <button :class="ismovieadded(movie.id) ? 'btn-delete' : 'btn-add'" @click="handlemovie(movie)">{{ ismovieadded(movie.id) ? 'Supprimer' : 'Ajouter' }}</button>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<style scoped>
#world
{
    display: flex;
  justify-content: center; /* centre horizontalement #main */
  align-items: flex-start;  /* top align pour coller avec margin-top */
  width: 100%;
  min-height: 100vh; 
}
#main
{
    display: flex;
    align-items: center;
    flex-direction: column;
}
#maininfo
{
    margin-top: 30px;
    width: 80%;
    background-color: #1F2937;
    display: flex;
    justify-content: flex-start;
}

#maininfo h2
{
    color: #E5E7EB;
}
#filmcontainer
{
    
  padding: 0;
  background-color: #1F2937;
  list-style: none;
  border-radius: 15px;
  box-shadow: -14px 8px 16px rgba(0, 0, 0, 0.2);
  width: 1400px;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#pageselection
{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    width: 100%;
    height: 50px;
    background-color: #60A5FA;
}

#separateur1
{
    width: 1600px ;
    margin: 20px 0;  
}



.movieselection
{
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 0;
    list-style: none;
    gap: 30px;
}

.moviecard
{
    gap: 20px;
    margin: 20px 0;
    
    display: flex;
    justify-content: flex-start;
    list-style: none;
    width: 100%;
    height: 100%;
    background-color: #0D1117;
}

.filmtitle
{
    padding: 20px;
    margin: 20px;
    width: 310px;
    height: 480px;
    min-width: 310px;
    min-height: 480px;
    background-color: #1F2937;
    color: #FBBF24;
    cursor: pointer;
}
.filmtitle h2
{
    margin: 0;
    margin-left: 10px;
    margin-bottom: 10px;
    padding: 0;
}
.filmAffiche
{
    width: 100%;
    height: 90%;
    background-color: #60A5FA;
}

.filminfos
{
    margin: 20px;
    width: 100%;
}

.filminfos
{
    color: #9CA3AF;
}

#separateur2
{
    width: 100%;
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