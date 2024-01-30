import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { isEmpty } from "lodash"

import { getRecommendedMovieData } from "utils/endpoints"
import { extractJSON, makeArray } from "utils/general"

import MovieCollection from "./MovieCollection"
import { useUserContext } from "context"

const MOVIE_AI_INPUT_LIMIT = 10

export default function Ai({ likedMovies }) {
  const { aiRecommendations, setAiRecommendations, dislikedMovies } =
    useUserContext()

  const [recommendedMovieData, setRecommendedMovieData] = useState()
  const [loading, setLoading] = useState(false)

  const likedMovieTitles = likedMovies
    ?.slice(likedMovies.length - MOVIE_AI_INPUT_LIMIT, likedMovies.length)
    .map(m => m.title)

  const dislikedMoviesTitles = dislikedMovies
    ?.slice(dislikedMovies.length - MOVIE_AI_INPUT_LIMIT, dislikedMovies.length)
    .map(m => m.title)

  const likedMovieTitlesString = String(likedMovieTitles)
  const recommendationsExist = Boolean(
    aiRecommendations[likedMovieTitlesString],
  )

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["ai", likedMovies],
    enabled: Boolean(likedMovies) && !recommendationsExist,
    queryFn: async () => {
      const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          likedMovies: likedMovieTitles,
          dislikedMovies: dislikedMoviesTitles,
        }),
      })

      const data = await response.json()
      const content = data.data.choices[0].message.content

      // Caching to not have to use openai Credits
      setAiRecommendations(curr => ({
        ...curr,
        [likedMovieTitlesString]: extractJSON(content),
      }))

      return extractJSON(content)
    },
  })

  useEffect(() => {
    const setRecommendedMovieDate = all => {
      setLoading(false)
      setRecommendedMovieData(all)
    }

    setLoading(true)

    if (isEmpty(data) && recommendationsExist) {
      getRecommendedMovieData(aiRecommendations[likedMovieTitlesString]).then(
        setRecommendedMovieDate,
      )

      return
    }

    if (Array.isArray(data)) {
      getRecommendedMovieData(data).then(setRecommendedMovieDate)
    }
  }, [aiRecommendations, data, recommendationsExist, likedMovieTitlesString])

  if (isLoading || isRefetching || loading) {
    return (
      <>
        <p className='p-6 text-2xl text-neutral-500'>
          Getting recommendations from ChatGPT...
        </p>

        <div className='grid grid-cols-7 gap-1'>
          {makeArray(7).map(key => (
            <div
              key={key}
              className='aspect-[1/1.5] bg-neutral-900 animate-pulse'
            />
          ))}
        </div>
      </>
    )
  }

  if (isEmpty(recommendedMovieData)) {
    return (
      <div className='flex items-center justify-center gap-4'>
        <p>It seems something went wrong please try again</p>
        <button onClick={refetch} className='px-2 text-2xl border rounded'>
          ↺
        </button>
      </div>
    )
  }

  return (
    <MovieCollection
      view='bar'
      movieList={{
        title: "Recommended by ChatGPT",
        movies: recommendedMovieData,
      }}
    />
  )
}
