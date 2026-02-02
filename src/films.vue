<script setup>
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import Navigateur from './Navigateur.vue';

const router = useRouter();
const filmdatabase = ref([]);


onMounted (async () => {

    try 
    {
        const response = await fetch("http://localhost:3000/films",
        {
            method: 'GET',
        })

        const result = await response.json()
        filmdatabase.value = result;
    
    }
    catch(error)
    {
        console.log("erreur", error);
    }

})

</script>

<template>

    <div id="world">
        
        <div id="main">
            <Navigateur></Navigateur>
            <div id="maininfo">
                <h2>Ajoutez les films que vous avez vu ou ceux que vous comptez voir !</h2>
            </div>
        <hr>
            <div id="filmcontainer">
                <ul class="movieselection">
                    <li class="moviecard" v-for="movie in filmdatabase" :key="movie.id">
                    <div class="filmtitle">
                        <p>{{ movie.title }}</p>
                        <div class="filmAffiche"></div>
                    </div>
                    <div class="filminfos">
                    <p>{{ movie.publication_date }},</p> 
                    <p>{{ movie.realisateur }}</p>
                    <button>Ajouter</button>
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

hr
{
    width: 1800px ;
    margin: 50px 0;
    
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
    width: 210px;
    height: 380px;
    background-color: #1F2937;
}

.filmAffiche
{
    width: 100%;
    height: 80%;
    background-color: #60A5FA;
}

.filminfos
{
    margin: 20px;
}
</style>