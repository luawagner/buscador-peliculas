import responseMovies from '../mock/with-results.json'

export function useMovies () {
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
return { movies: mappedMovies }
}