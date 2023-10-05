import { Movies } from "./components/movies";
import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from 'just-debounce-it'

function useSearch() {
  //validaciones
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);
  //Casi siempre que hay un useEffect puede ser un custom hook
  useEffect(() => {
    //Antes de que ingresemos un valor en el input 'search', para que no salte la validación del campo vacío
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("Ingresa una película");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No puedes buscar por un número"); //si el input es solo numeros no se puede hacer la busqueda
      return;
    }

    setError(null);
  }, [search]); //vigila los cambios en el input
  return { search, updateSearch, error };
}

function App() {
  const [ sort, setSort ] = useState(false) //se lo pasamos a useMovies
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });
  const handleSubmit = (event) => {
    event.preventDefault();
    // const  { query }  = Object.fromEntries(new window.FormData(event.target))
    getMovies({ search });
  };


  const debouncedGetMovies = useCallback(
    debounce(search => {
    console.log('search', search);
    getMovies({search})
  }, 300), 
  [getMovies])

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch);
    debouncedGetMovies(newSearch)
  };
//activa o desactiva la funcionalidad de ordenar peliculas
  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas:</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Avengers, Star Wars, the Matrix..."
          />
          
          <button type="submit">Buscar</button>
          <div>
          <label htmlFor="sort">Ordenar películas:</label>
  <input name="sort" type="checkbox" onChange={handleSort} checked={sort} />
          </div>
          
        </form>
        {error && <p style={{ color: "red" }}>{error} </p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
