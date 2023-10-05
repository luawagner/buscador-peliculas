import { searchMovies } from "../services/movies";
import { useState, useRef, useMemo, useCallback } from "react";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null)
  const previousSearch = useRef()




//Podemos usar useCallback para que guarde una función, en lugar de un valor y así evitar que
//esta función se ejecute cada vez que se renderiza el componente
  const getMovies = useCallback( async ({ search }) => {
      //ahora depende del valor que le estamos inyectando por parámetro se crea la función una sola vez.
      if(search === previousSearch.current) return

      try{
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch(e) {
        setError(e.message)
      }
    },[]);

// [search] ----> Para que sea más óptimo, es mejor pasárle este dato como parámetro de la función, en lugar de la dependencia.
//le indicamos que se ejecute cada vez que cambie el search
//cuando le doy a buscar o al sort, que hacen que se renderice el componente, no se va a ejecutar, porque solo lo hace cuando cambia el search


//usamos useMemo para que no vuelva a ejecutar la funcion cada vez que cambie el search
//El cuerpo de la función es el render. Cada método se ejecuta cada vez que se renderiza el componente, 
//en este caso cada vez que cambia el search que le pasamos como parámetro
//excepto los hooks 
//useMemo memoriza un VALOR para no tener que volver a calcularlo
//solo se vuelve a ejecutar cuando cambian las dependencias que le indicamos, como al useEffect
  const sortedMovies = useMemo(() => {
   
    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies;
  }, [sort, movies])
  return { movies: sortedMovies, getMovies };
  //exporto la lista de peliculas de la busqueda y la funcion para poder hacer la busqueda
}
