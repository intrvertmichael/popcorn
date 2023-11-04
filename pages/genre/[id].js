import { getMoviesFromGenre, getGenreLabel } from "utils/movie.api"

export { default } from "containers/GenreContainer"

export const getServerSideProps = async context => {
  const id = context.params.id
  let page = context.query.page ? context.query.page : 1

  let movies
  if (context.query.page) movies = await getMoviesFromGenre(id, page)
  else movies = await getMoviesFromGenre(id)

  const genreLabel = await getGenreLabel(id)

  return { props: { movies, genreLabel, page } }
}
