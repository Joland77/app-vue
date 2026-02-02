<script setup>
import {stringifyQuery, useRouter} from 'vue-router';
import {ref} from 'vue';

const router = useRouter();
const email = ref('');
const username = ref('');
const password1 = ref('');
const password2 = ref('');
const birthday = ref('');

async function handlesign()
{
    if(!email.value || !username.value || !password1.value ||!password2.value || !birthday.value)
    {
        alert("Veuillez remplir tout les champs pour compléter votre inscription");
        return;
    }
    else if (password1.value != password2.value)
    {
        alert("Les mots de passes doivent correspondre");
        return;
    }
    else{
        const response = await fetch('http://localhost:3000/inscription',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                email : email.value,
                username: username.value,
                password : password1.value,
                date_of_birth : birthday.value,
            })
        });
        const data = await response.json()
        if(response.status === 400)
        {
            if(data.emailcheck == true && data.usernamecheck == true)
            {
                emailcheck = false;
                usernamecheck = false;
                alert("Le pseudo et l'email sont tout deux déjà existant");
            }
            else if (data.usernamecheck == true)
            {
                alert("Ce pseudo existe déjà, veuillez en choisir un autre");
            }
            else if (data.emailcheck == true)
            {
                alert("Cet email est déjà utilisé")
            }
        }

        else if (response.status === 500)
        {
            alert(data.message);
        }
        else if (response.status === 201)
        {
            router.push('/');
        }
    }
}

    /*const response = await fetch('http://localhost:3000/inscription',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(
        {
            email : email.value,
            username : username.value,
            password : password1.value,
            date_of_birth : birthday.value
        })

    
    });*/

</script>

<template>
<div id="world">
<div id="sign">
    <h2>Veuillez vous inscrire :</h2>
    <form id="inscriptionblock" @submit.prevent="handlesign()">
        <p>email :</p>
        <input type="email" placeholder="email" v-model="email"></input>
        <p>pseudonyme :</p>
        <input type="text" placeholder="pseudo" v-model="username"></input>
        <p>mot de passe :</p>
        <input type="password" placeholder="Mot de passe" v-model="password1"></input>
        <p>confirmez le mot de passe :</p>
        <input type="password" placeholder="Confirmez votre mot de passe" v-model="password2"></input>
        <p>date de naissance :</p>
        <input type="date" v-model="birthday"></input>
    <button type="submit">Inscription</button>
    </form>
</div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

#world
{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
}
#sign
{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 800px;
    height: 800px;

    background-color: #1F2937;
    color :#9CA3AF
}

#sign > h2 
{
    color: #E5E7EB;
}

form > p 
{
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    margin: 0;
    margin-bottom: 8px;
    margin-top: 15px;
    padding: 0;
}


#inscriptionblock > input
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
</style>