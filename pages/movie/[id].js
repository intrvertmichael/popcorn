import {
  getSingleMovie,
  getImageList,
  getRecommendedMovies,
} from "utils/movie.api"

export { default } from "containers/MovieContainer"

export const getStaticPaths = async () => ({ paths: [], fallback: true })

export const getStaticProps = async context => {
  const id = context.params.id
  const movie = await getSingleMovie(id)
  const images = await getImageList(id)
  const recommended = await getRecommendedMovies(id)

  return { props: { movie, images, recommended } }
}
