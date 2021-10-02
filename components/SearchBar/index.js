import { useState} from 'react'
import styles from '../../styles/SeachBar.module.css'
import Movie from '../Movie/index'
import Results from './Results'
import {useGetFirebaseUser} from '../../context/FirebaseContext'

const SearchBar = () => {
    const firebaseUser = useGetFirebaseUser()

    const [searchText, setSearchText] = useState()
    const [results, setResults] = useState()
    const [timer, setTimer] = useState()


    function filter_movies(data) {
        const movies = []
        // data.results.map( movie => <Movie movie={movie} key={movie.id}/> )

        data.results.map( movie => {
            // check if movie is disliked
            const fb_disliked = firebaseUser && firebaseUser.movies && firebaseUser.movies.disliked?
            firebaseUser.movies.disliked.find(m => m.movie_id.toString() === movie.id.toString()) : null

            // check if movie is liked
            const fb_liked = firebaseUser && firebaseUser.movies && firebaseUser.movies.liked?
            firebaseUser.movies.liked.find(m => m.movie_id.toString() === movie.id.toString()) : null

            const liked = fb_liked? true : null
            // if movie is not disliked then show it on the grid
            if(!fb_disliked) movies.push(<Movie movie={movie} key={movie.id} fb_liked={liked}/>)
        })

        return movies
    }

    async function fetchResults(requested_page){
        console.log("fetching results...")

        let res
        if(requested_page) res = await fetch('/api/search', { headers: { searchTerm: searchText.value, page: requested_page}})
        else res = await fetch('/api/search', { headers: { searchTerm: searchText.value}})
        const data  = await res.json()
        const movies = filter_movies(data)

        console.log( movies?.length, "results")
        if(searchText && movies?.length <= 1) fetchResults(requested_page + 1)

        console.log('after fetching results')

        const page =  data.page
        const total_pages = data.total_pages

        setResults( {movies, page, total_pages} )
    }

    function searchSubmitted(){
        clearTimeout(timer)
        if(!searchText || searchText.value === '') setResults(null)
        else fetchResults(1)
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