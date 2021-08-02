import { useState } from 'react'
import styles from '../../styles/SeachBar.module.css'
import Movie from '../Movie/index'
import Results from './Results'

const SearchBar = () => {

    const [searchText, setSearchText] = useState()
    const [results, setResults] = useState()
    const [timer, setTimer] = useState()

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

    function searchSubmitted(){
        if(searchText && searchText.value === '') setResults(null)
        else fetchResults()
    }

    function typing(e){
        e.preventDefault()
        setSearchText({ value: e.target.value })

        clearTimeout(timer)
        const timer_id = setTimeout(searchSubmitted, 500)
        setTimer(timer_id)
    }

    return (
        <div className={styles.search}>
            <form className={styles.search_bar} onSubmit={ e => {
                e.preventDefault()
                searchSubmitted()
            } }>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    onChange={typing}
                    value={searchText? searchText.value : ''} />
                <button> 🔎 </button>
            </form>

            <Results {...{results, setSearchText, setResults, fetchResults}} />
        </div>
    )
}

export default SearchBar