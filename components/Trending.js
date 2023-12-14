import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { getTrending } from "utils/movie.api"

export default function Trending() {
  const { isLoading, data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  })

  if (isLoading) return <>Loading...</>

  return (
    <ul className='grid grid-cols-10'>
      {trending?.map(movie => (
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
