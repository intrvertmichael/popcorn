import { useState } from "react"
import { isEmpty } from "lodash"

import MovieCollection from "./MovieCollection"

export default function Search() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  //   const [page, setPage] = useState(1)

  const searchForMovie = async movie => {
    const res = await fetch("/api/search", {
      headers: { movie },
    })

    const data = await res.json()
    setResults(data.results)
  }

  const clearInput = () => {
    setInput("")
    setResults([])
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (isEmpty(input)) clearInput()
    else searchForMovie(input)
  }

  return (
    <div className='p-6 bg-neutral-900'>
      <div className='flex w-full border rounded-lg'>
        <form onSubmit={handleSubmit} className='w-full'>
          <input
            placeholder='Search for movie here'
            className='w-full p-2 text-white bg-transparent'
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
        </form>

        <button onClick={clearInput} className='px-4'>
          X
        </button>
      </div>

      {!isEmpty(results) && (
        <MovieCollection
          view='bar'
          movieList={{
            movies: results,
            title: "Search Results",
          }}
        />
      )}
    </div>
  )
}
