<script setup>
import {ref, onMounted, watch} from 'vue';
import { useRouter } from 'vue-router';
import Navigateur from './Navigateur.vue';

const token =  localStorage.getItem('token');

const router = useRouter();
const filmdatabase = ref([]);
const page = ref(1);
const limit = ref(5);

const totalpages = ref(0);
const totalfilms = ref(0);



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
      console.log(data.message);  
    }
    
    }
    catch(error)
    {
        console.log("erreur lors de l'ajout du film");
    }

}

onMounted(() =>
{
    loadfilm();
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
                    <div class="filmtitle">
                        <h2>{{ movie.title }}</h2>
                        <div class="filmAffiche"></div>
                    </div>

                    <div class="filminfos">
                        <h1>Note</h1>
                        <hr id="separateur2">
                        <p>Date de parution : {{ new Date(movie.publication_date).toLocaleDateString('fr-FR') }}</p> 
                        <p>Réalisateur : {{ movie.realisateur }}</p>
                        <button @click="addmovie(movie)">Ajouter</button>
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
</style>