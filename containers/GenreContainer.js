import Link from "next/link"

import MovieCollection from "components/MovieCollection"

export default function GenreDetails({ movies, genreLabel, page }) {
  if (!movies && !genreLabel && !page) return false

  const nextPage = (parseInt(page) + 1).toString()
  const prevPage = (parseInt(page) - 1).toString()

  const backBtn =
    movies.page > 1 ? (
      <Link href={"/genre/" + genreLabel.id + "?page=" + prevPage}>←</Link>
    ) : (
      <p> ← </p>
    )

  const next_page_label = "/genre/" + genreLabel.id + "?page=" + nextPage
  const nextBtn =
    movies.page < movies.total_pages ? (
      <Link href={next_page_label}>→</Link>
    ) : (
      <p> → </p>
    )

  return (
    <div className='w-full max-w-4xl m-auto'>
      <div className='text-center py-10 text-3xl'>
        <h1>{genreLabel.name} Movies</h1>
      </div>

      <MovieCollection view='grid' movieList={{ movies: movies.results }} />

      <nav className='flex gap-3 text-3xl m-auto w-fit py-10 text-neutral-500'>
        {backBtn}
        <p>
          Page <span className='text-white'>{page}</span> / {movies.total_pages}
        </p>
        {nextBtn}
      </nav>
    </div>
  )
}
