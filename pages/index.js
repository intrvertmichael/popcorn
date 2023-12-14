import { QueryClient, dehydrate } from "@tanstack/react-query"
import { getGenres, getBestOf2023 } from "utils/movie.api"

export { default } from "containers/HomeContainer"

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: ["genres"], queryFn: getGenres })

  await queryClient.prefetchQuery({
    queryKey: ["best2023"],
    queryFn: getBestOf2023,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      fallback: false,
    },
  }
}
