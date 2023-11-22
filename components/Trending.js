import Image from "next/image"
import Link from "next/link"

export default function Trending({ movies }) {
  if (!movies) return false

  return (
    <ul className='grid grid-cols-10'>
      {movies?.map(movie => (
        <Link
          key={movie.id}
          href={"/movie/" + movie.id}
          passHref
          className='aspect-[1/1.5] relative'
        >
          <Image src={movie.image} alt={movie.title} fill={true} sizes='10vw' />
        </Link>
      ))}
    </ul>
  )
}
