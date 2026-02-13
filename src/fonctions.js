import {useRouter} from 'vue-router';

export function useFilms()
{
    const router = useRouter();

    function GoToFilm(movie)
    {
        router.push(`/films/${movie.slug}`)
    }

    return {GoToFilm};
}