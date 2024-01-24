import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { isEmpty } from "lodash"

import {
  createMovieImageURL,
  getImageList,
  getRecommendedMovies,
  getSingleMovie,
  getVideoList,
} from "utils/movie.api"
import { createFullLength, createFullDate } from "utils/general"

import Rating from "components/Rating"
import Carousel from "components/Carousel"
import MovieCollection from "components/MovieCollection"
import VoteButtons from "components/VoteButtons"

export default function Movie({ id }) {
  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    enabled: Boolean(id),
    queryFn: () => getSingleMovie(id),
  })

  const { data: images } = useQuery({
    queryKey: ["images", id],
    enabled: Boolean(id),
    queryFn: () => getImageList(id),
  })

  const { data: trailer } = useQuery({
    queryKey: ["videos", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const videos = await getVideoList(id)
      const trailer = videos.results.find(m => m.type === "Trailer")
      return trailer.key
    },
  })

  const { data: recommended } = useQuery({
    queryKey: ["recommended", id],
    enabled: Boolean(id),
    queryFn: () => getRecommendedMovies(id),
  })

  if (!movie || !images) return <>Loading...</>

  const fullDate = createFullDate(movie.release_date)
  const fullLength = createFullLength(movie.runtime)

  return (
    <>
      <Carousel images={images?.backdrops} />

      <div className='relative z-10 w-full max-w-3xl px-3 mx-auto -mt-32 pointer-events-none lg:-mt-56'>
        <div className='flex items-end gap-3'>
          <div className='relative w-44 aspect-[1/1.5] pointer-events-auto'>
            <Image
              src={createMovieImageURL(movie.poster_path)}
              alt={movie.title}
              fill={true}
              sizes='20vw'
            />
          </div>

          <Rating score={movie.vote_average} count={movie.vote_count} />

          <ul className='flex flex-wrap gap-1 pointer-events-auto'>
            {movie.genres?.map(g => (
              <Link href={"/genre/" + g.id} key={g.id} passHref>
                <li className='px-2 py-1 rounded text-neutral-400 bg-neutral-900 hover:text-white'>
                  {g.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className='px-12 py-36'>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl '>{movie.title}</h1>
            {!isEmpty(trailer) && (
              <a
                target='_blank'
                href={`https://www.youtube.com/watch?v=${trailer}`}
                rel='noopener noreferrer'
                className='px-3 py-1 text-xs border rounded-lg cursor-pointer pointer-events-auto text-neutral-600 border-neutral-600 hover:text-white hover:border-white'
              >
                Watch Trailer
              </a>
            )}
          </div>

          <h2 className='text-neutral-500'>{movie.tagline}</h2>
          <p className='py-12 leading-8'>{movie.overview}</p>

          <p className='text-right'> Released on {fullDate}</p>
          <p className='text-right'> {fullLength} long</p>

          <div className='flex justify-center gap-2 mt-6'>
            <VoteButtons movie={movie} />
          </div>
        </div>
      </div>

      <MovieCollection
        view='bar'
        movieList={{
          movies: recommended?.results,
          title: "Recommended Movies",
        }}
      />
    </>
  )
}
