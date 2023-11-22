import Image from "next/image"
import Link from "next/link"

import { createMovieImageURL } from "utils/movie.api"
import { createFullLength, createFullDate } from "utils/general"
import { useGetFirebaseUser } from "context/FirebaseContext"

import Rating from "components/Rating"
import Carousel from "components/Carousel"
import MovieCollection from "components/MovieCollection"
import VoteButtons from "components/VoteButtons"

export default function Movie({ movie, images, recommended }) {
  const firebaseUser = useGetFirebaseUser()

  if (!movie || !images || !recommended) return false

  const fullDate = createFullDate(movie.release_date)
  const fullLength = createFullLength(movie.runtime)

  return (
    <>
      <Carousel
        images={images.backdrops.map((img, key) => (
          <Image
            key={key}
            alt={key}
            src={createMovieImageURL(img.file_path)}
            fill={true}
            sizes='(max-width: 2400px) 100vw, (max-width: 1200px) 50vw'
          />
        ))}
      />

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
            {movie.genres.map(g => (
              <Link href={"/genre/" + g.id} key={g.id} passHref>
                <li className='px-2 py-1 rounded text-neutral-400 bg-neutral-900 hover:text-white'>
                  {g.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className='px-12 py-36'>
          <h1 className='text-2xl '>{movie.title}</h1>
          <h2 className='text-neutral-500'>{movie.tagline}</h2>
          <p className='py-12 leading-8'>{movie.overview}</p>

          <p className='text-right'> Released on {fullDate}</p>
          <p className='text-right'> {fullLength} long</p>

          {firebaseUser && (
            <div className='flex gap-2'>
              <VoteButtons movie={movie} />
            </div>
          )}
        </div>
      </div>

      <MovieCollection
        view='bar'
        movieList={{
          movies: recommended.results,
          title: "Recommended Movies",
        }}
      />
    </>
  )
}
