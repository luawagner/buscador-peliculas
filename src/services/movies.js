const API_KEY = "4287ad07";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;
  try {
    const response = await fetch(
      `http://omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;
    //Mapeo la API para no utilizar su contrato y establecer un contrato propio
    //Si cambiamos de API solo tendremos que cambiar los datos que consumimos aquí en el mapeo
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error searching movies");
  }
};
