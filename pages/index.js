import { getGenres, getBestThisYear } from "utils/movie.api"

export { default } from "containers/HomeContainer"

export async function getServerSideProps() {
  let genres = await getGenres()
  if (!genres) genres = []

  let best = await getBestThisYear()
  if (!best) best = []

  return { props: { best, genres, fallback: false } }
}
