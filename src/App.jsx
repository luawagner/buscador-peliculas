import { Movies } from './components/movies'
import './App.css'
import { useMovies } from './hooks/useMovies'



function App() {
  const { movies: mappedMovies } = useMovies()

  return (
    <div className='page'>
    <header>
      <h1>Buscador de películas:</h1>
      <form className='form'>
        <input type="text" placeholder='Avengers, Star Wars, the Matrix...' />
      <button type='submit'>Buscar</button>
      </form>
      </header>
      
      <main>
      <Movies movies={mappedMovies} />
      </main>
      </div>
  )
}

export default App
