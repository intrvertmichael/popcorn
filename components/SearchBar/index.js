import { useState } from 'react'
import styles from '../../styles/SeachBar.module.css'
import Movie from '../Movie/index'
import Results from './Results'

const SearchBar = () => {

    const [searchText, setSearchText] = useState()
    const [results, setResults] = useState()

    async function fetchResults(requested_page){

        let res
        if(requested_page) res = await fetch('/api/search', { headers: { searchTerm: searchText.value, page: requested_page}})
        else res = await fetch('/api/search', { headers: { searchTerm: searchText.value}})

        const data = await res.json()

        const movies = data.results.map( movie => <Movie movie={movie} key={movie.id}/> )
        const page = data.page
        const total_pages = data.total_pages

        setResults( {movies, page, total_pages} )
    }

    function searchSubmitted(e){
        e.preventDefault()

        if(searchText && searchText.value === '') setResults(null)
        else fetchResults()
    }

    function typing(e){
        e.preventDefault()
        setSearchText({ value: e.target.value })
    }

    return (
        <div className={styles.search}>
            <form className={styles.search_bar} onSubmit={searchSubmitted}>
                <input type="text" onChange={typing}  value={searchText? searchText.value : ''} />
                <button> 🔎 </button>
            </form>

            {
                results?
                <Results {...{results, setSearchText, setResults, fetchResults}} />
                : ''
            }
        </div>
    )
}

export default SearchBar