<script>
import {stringifyQuery, useRouter} from 'vue-router';
import {ref} from 'vue';

const router = useRouter();
const email = ref('');
const username = ref('');
const password1 = ref('');
const password2 = ref('');
const birthday = ref('');

async function handlesignin()
{
    if(!email.value || !username.value || !password1.value ||!password2.value)
    {
        alert("Veuillez remplir tout les champs pour compléter votre inscription");
    }
    else if (password1.value != password2.value)
    {
        alert("Les mots de passes doivent correspondre");
    }
    else{
        const response = await fetch('http://localhost:3000/inscription',
        {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                email : email.value,
                username: username.value,
                password : password1.value,
                date_of_birth : birthday.value,
            })
        })
        const data = await response.json()
        if(data.emailcheck == true && data.usernamecheck == true)
        {
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
        else
        {
            const response2 = await fetch('http://localhost:3000/inscription',{
                method : 'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(
                 {
                    email : email.value,
                    username : username.value,
                    password : password1.value,
                    date_of_birth : birthday.value
                 })
            });
            router.push('/app');
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
<div id="sign">
    <h2>Veuillez vous inscrire :</h2>
    <form @submit.prevent="handlesignin()">
        <p>email :</p>
        <input type="email" v-model="email"></input>
        <p>pseudonyme :</p>
        <input type="text" v-model="username"></input>
        <p>mot de passe :</p>
        <input type="password" v-model="password1"></input>
        <p>confirmez le mot de passe :</p>
        <input type="password" v-model="password2"></input>
        <p>date de naissance :</p>
        <input type="date" v-model="birthday"></input>
    <button type="submit">Inscription</button>
    </form>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

body
{
    background-color: #0D1117;
    
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

</style>