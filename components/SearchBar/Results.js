import styles from '../../styles/SeachBar.module.css'

const Results = ({results, setSearchText, setResults, fetchResults}) => {

    if (results.movies.length < 1 ) {
        return <div className={styles.clear_search}>No matching movies found</div>
    }


    return (
        <div className={styles.results_wrapper}>
            <button className={styles.clear_search} onClick={()=> {
                setSearchText(null)
                setResults(null)
            }}> Clear Search </button>

            <ul className={styles.results}>
                {results.movies}
            </ul>

            <nav>
                {
                    results.page > 1 ?
                        <button onClick={() => fetchResults(results.page - 1)}>
                            ←
                        </button>
                        : <p>←</p>
                }

                <p>Page <span>{results.page}</span> / {results.total_pages}</p>

                {
                    results.page < results.total_pages ?
                        <button onClick={() => fetchResults(results.page + 1)}>
                            →
                        </button>
                        : <p>→</p>
                }
            </nav>
        </div>
    )
}

export default Results;