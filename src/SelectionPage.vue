<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Users = ref([]); 
const error = ref(null);
const router = useRouter();

let username = ref('');
let password = ref('');

async function handleLogin()
{
  const response = await fetch("http://localhost:3000/login",{

    method : 'POST',
    headers: { 'Content-Type':'application/json'},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });
  const code = response.status;
  const data = await response.json();

  if (code == 200)
  {
    const token = data.token;
    localStorage.setItem('token', token);
    router.push('/app');
  }
  else
  {
    alert(data.message);
  }
}

</script>


<template>


<div class = "Userselect">
  <form @submit.prevent="handleLogin()">
  <h1> Connexion </h1>
  <p>Entrez vos identifiants :</p>
  <div class="inputs">
    <input type="username" placeholder="username" v-model="username"></input>
    <input type="password" placeholder="Mot de passe" v-model="password"></input>
    <p>Je n'ai pas de compte, je veux <span><a href="/inscription">m'inscrire</a></span></p> 
  </div>
    <button type="submit">Se connecter</button>
  </form>
</div>



 <!--
<div class = "Userselect">
    <h1> Séléctionne un utilisateur</h1>
    <p v-if="error" > {{ error }}></p>
    <ul>
        <div>
         <li id="user" v-for="User in Users" :key="User.id">
            <button @click="UserSelection(User.nom)">{{ User.nom }}</button>
         </li>
        
        </div>
    </ul>
</div>
 -->
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

body
{
  font-family: "Roboto", sans-serif;
  background-color: rgb(82, 145, 156);
  
  display: flex;
  align-items: center;
  justify-content: center;
}

h1
{
  font-size: 45px;
}
p
{
  font-size: 24px;
}

.Userselect
{
    margin-top: 100px;
    padding: 20px 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    
    background-color: rgb(157, 190, 199);
    border-radius: 8px;
    border: solid 3px black;
    width: 500px;
    height: 600px;
}

form
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form p 
{
  align-self: flex-start;
  margin-left: 15px;
}

.inputs 
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 100%;

}

.inputs input
{
  padding: 12px 12px;
  margin: 10px;
  margin-bottom: 12px;
  width: 320px;

  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #e0e0e0;
}

.inputs p
{
  align-self: center;
  font-size: 16px;
}

.inputs p span
{
  color: rgb(14, 111, 255);
}

form button
{
  margin: 4px 0px;
  padding: 4px 0px;
  width: 50%;
}


</style>