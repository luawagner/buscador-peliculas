import withoutResults from '../mock/no-results.json'
import { useState } from 'react'


export function useMovies ({ search }) {
  const [responseMovies, setResponseMovies ] = useState([])
    //Tenemos peliculas cuando podemos acceder a Search y este contiene un array
    const movies = responseMovies.Search
    //Mapeo la API para no utilizar su contrato y establecer un contrato propio
    //Si cambiamos de API solo tendremos que cambiar los datos que consumimos aquí en el mapeo
    const mappedMovies = movies?.map(movie => (
    {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
  
    }
    ))

    const getMovies = () => {
      if (search) {
        fetch(`http://omdbapi.com/?apikey=4287ad07&s=${search}`)
        .then(res => res.json())
        .then(json => {
          setResponseMovies(json)
        })
      } else {
        setResponseMovies(withoutResults)
      }
    }
return { movies: mappedMovies, getMovies }
}