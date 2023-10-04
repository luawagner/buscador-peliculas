import { searchMovies } from "../services/movies";
import { useState, useRef } from "react";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null)
  const previousSearch = useRef()

  const getMovies = async () => {
    if(search === previousSearch.current) return

    try{
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch(e) {
      setError(e.message)
    }
   
  };
  return { movies, getMovies };
  //exporto la lista de peliculas de la busqueda y la funcion para poder hacer la busqueda
}
