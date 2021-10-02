import styles from '../../styles/SeachBar.module.css'

const Results = ({results, setSearchText, setResults, fetchResults}) => {

    if(!results) return false

    function clearResults(){
        setSearchText(null)
        setResults(null)
    }

    if (results.movies?.length < 1 ) {
        return (
            <div
                className={styles.clear_search}
                onClick={clearResults}
                style={{textAlign: "center"}}
                >
                No matching movies found. <br/>
                Please try again
            </div>
        )
    }

    const backBtn = (
        results.page > 1 ?
        <button onClick={() => fetchResults(results.page - 1)}>
            ←
        </button>
        : <p>←</p>
    )

    const nextBtn = (
        results.page < results.total_pages ?
        <button onClick={() => fetchResults(results.page + 1)}>
            →
        </button>
        : <p>→</p>
    )


    return (
        <div className={styles.results_wrapper}>
            <button className={styles.clear_search} onClick={clearResults}> Clear Search </button>

            <ul className={styles.results}>
                {results.movies}
            </ul>

            {
                results.total_pages > 1?
                <nav>
                    {backBtn}
                    <p>Page <span>{results.page}</span> / {results.total_pages}</p>
                    {nextBtn}
                </nav>
                : ""
            }
        </div>
    )
}

export default Results;