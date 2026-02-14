import {useRouter} from 'vue-router';

export function useFilms()
{
    const router = useRouter();
    const token = localStorage.getItem('token');

    function GoToFilm(movie)
    {
        router.push(`/films/${movie.slug}`)
    }

 async function addmovie(movie, userfilmid)
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

async function deletemovie(movie, userfilmid)
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
    return {GoToFilm, addmovie, deletemovie};
}
