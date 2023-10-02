import { Movies } from './components/movies'
import './App.css'
import responseMovies from './mock/with-results.json'
import withoutResults from './mock/no-results.json' 
import { useMovies } from './hooks/useMovies'

const API_KEY = '4287ad07'

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
