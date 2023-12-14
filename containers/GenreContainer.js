import { isEmpty } from "lodash"
import { useQuery } from "@tanstack/react-query"

import { getGenreLabel, getMoviesFromGenre } from "utils/movie.api"

import MovieCollection from "components/MovieCollection"
import GenrePageControl from "components/GenrePageControl"

export default function GenreDetails({ id, page }) {
  const { data: movies } = useQuery({
    queryKey: ["genreMovies", id, page],
    enabled: Boolean(id),
    queryFn: () =>
      page ? getMoviesFromGenre(id, page) : getMoviesFromGenre(id),
  })

  const { data: genreLabel } = useQuery({
    queryKey: ["genreLabel", id],
    enabled: Boolean(id),
    queryFn: () => getGenreLabel(id),
  })

  if (isEmpty(movies) || isEmpty(genreLabel)) return <>Loading...</>

  return (
    <div className='w-full max-w-4xl m-auto'>
      <div className='py-10 text-3xl text-center'>
        <h1>{genreLabel.name} Movies</h1>
      </div>

      <MovieCollection view='grid' movieList={{ movies: movies.results }} />

      <nav className='flex gap-3 py-10 m-auto text-3xl w-fit text-neutral-500'>
        <GenrePageControl
          label='←'
          genreLabel={genreLabel}
          page={(parseInt(page) - 1).toString()}
          showLink={movies.page > 1}
        />

        <p>
          Page <span className='text-white'>{page}</span> / {movies.total_pages}
        </p>

        <GenrePageControl
          label='→'
          genreLabel={genreLabel}
          page={(parseInt(page) + 1).toString()}
          showLink={movies.page < movies.total_pages}
        />
      </nav>
    </div>
  )
}
