import { useState } from 'react'
import styles from '../../styles/SeachBar.module.css'
import Movie from '../Movie/index'

const SearchBar = () => {

    const [searchText, setSearchText] = useState()
    const [results, setResults] = useState()


    async function fetchStuff(){
        const res = await fetch('/api/hello', { headers: { searchTerm: searchText.value}})
        const data = await res.json()

        const movies = data.results.map( movie => <Movie movie={movie} key={movie.id}/> )
        setResults(movies)
    }

    function searchSubmitted(e){
        e.preventDefault()

        if(searchText && searchText.value === ''){
            setResults(null)
        } else {
            fetchStuff()
        }

    }

    function typing(e){
        e.preventDefault()
        setSearchText({value: e.target.value})
    }

    return (
        <div className={styles.search}>
            <form className={styles.search_bar} onSubmit={searchSubmitted}>
                <input type="text" onChange={typing}  value={searchText? searchText.value : ''} />
                <button> 🔎 </button>
            </form>

            {
                results?
                <div className={styles.results_wrapper}>
                    <button onClick={()=> {
                        setSearchText(null)
                        setResults(null
                    )}}> Clear Search </button>
                    <ul className={styles.results}> {results} </ul>
                </div>
                : ''
            }
        </div>
    )
}

export default SearchBar